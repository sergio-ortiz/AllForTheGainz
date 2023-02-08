import React from "react";
import { supabase } from "../lib/supabaseClient";
import Exercise from "./exercise";

export default class Workout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    try {
      this.setState({ loading: true });
      const { user } = this.props.session;

      let { data, error, status } = await supabase
        .from(this.props.workout)
        .select()
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        this.setState(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  updateProfile = async (e) => {
    e.preventDefault();

    try {
      this.setState({ loading: true });
      const { user } = this.props.session;

      const updates = {
        user_id: user.id,
      };

      Object.entries(this.state)
        .filter(([k, v]) => /\d/.test(k))
        .forEach(([k, v]) => (updates[k] = v));

      let { error } = await supabase.from(this.props.workout).upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  handler = (e, k) => {
    const update = {};
    update[k] = e.target.value;
    this.setState(update);
  };

  render() {
    return (
      <div aria-live="polite">
        {this.state.loading ? (
          "Saving..."
        ) : (
          <form onSubmit={this.updateProfile} className="form-widget">
            {Object.entries(this.state)
              .filter(([k, v]) => /\d/.test(k))
              .map(([k, v]) => (
                <Exercise key={k} k={k} v={v} handler={this.handler} />
              ))}
            <div>
              <button
                className="button primary block"
                disabled={this.props.loading}
              >
                Update profile
              </button>
            </div>
          </form>
        )}
        <button
          value={null}
          className="button block"
          onClick={(e) => this.props.handler(e)}
        >
          Back
        </button>
        <button
          type="button"
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }
}
