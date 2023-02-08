import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supabase } from "../lib/supabaseClient";
import WorkoutSelect from "../components/workout-select.js";

class Page extends React.Component {
  constructor() {
    super();
    this.state = { session: null };
  }

  componentDidMount() {
    supabase.auth.getSession().then(({ data: { session } }) => {
      this.setState({ session });
    });
  }

  componentDidUpdate() {
    supabase.auth.onAuthStateChange((_event, session) => {
      this.setState({ session });
    });
  }

  render() {
    return (
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!this.state.session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
          />
        ) : (
          <WorkoutSelect session={this.state.session} />
        )}
      </div>
    );
  }
}

export default Page;
