import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [loading, setLoading] = useState(true);
  // calf raises
  const [calfRaises1, setCalfRaises1] = useState(null);
  const [calfRaises2, setCalfRaises2] = useState(null);
  const [calfRaises3, setCalfRaises3] = useState(null);
  // hack squat
  const [hackSquat1, setHackSquat1] = useState(null);
  const [hackSquat2, setHackSquat2] = useState(null);
  const [hackSquat3, setHackSquat3] = useState(null);
  // variation calf press
  const [calfPress1, setCalfPress1] = useState(null);
  const [calfPress2, setCalfPress2] = useState(null);
  const [inwardCalfPress1, setInwardCalfPress1] = useState(null);
  const [inwardCalfPress2, setInwardCalfPress2] = useState(null);
  const [outwardCalfPress1, setOutwardCalfPress1] = useState(null);
  const [outwardCalfPress2, setOutwardCalfPress2] = useState(null);
  // goblet squats
  const [gobletSquat1, setGobletSquat1] = useState(null);
  const [gobletSquat2, setGobletSquat2] = useState(null);
  const [gobletSquat3, setGobletSquat3] = useState(null);
  // leg curls
  const [legCurls1, setLegCurls1] = useState(null);
  const [legCurls2, setLegCurls2] = useState(null);
  const [legCurls3, setLegCurls3] = useState(null);
  // leg extensions
  const [legExtensions1, setLegExtensions1] = useState(null);
  const [legExtensions2, setLegExtensions2] = useState(null);
  const [legExtensions3, setLegExtensions3] = useState(null);
  // hip abductions
  const [hipAbductions1, setHipAbductions1] = useState(null);
  const [hipAbductions2, setHipAbductions2] = useState(null);
  const [hipAbductions3, setHipAbductions3] = useState(null);
  // leg press
  const [legPress1, setLegPress1] = useState(null);
  const [legPress2, setLegPress2] = useState(null);
  const [legPress3, setLegPress3] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("leg_day")
        .select()
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setCalfRaises1(data["calf_raises1"]);
        setCalfRaises2(data["calf_raises2"]);
        setCalfRaises3(data["calf_raises3"]);
        setHackSquat1(data["hack_squat1"]);
        setHackSquat2(data["hack_squat2"]);
        setHackSquat3(data["hack_squat3"]);
        setCalfPress1(data["calf_press1"]);
        setCalfPress2(data["calf_press2"]);
        setInwardCalfPress1(data["inward_calf_press1"]);
        setInwardCalfPress2(data["inward_calf_press2"]);
        setOutwardCalfPress1(data["outward_calf_press1"]);
        setOutwardCalfPress2(data["outward_calf_press2"]);
        setGobletSquat1(data["goblet_squat1"]);
        setGobletSquat2(data["goblet_squat2"]);
        setGobletSquat3(data["goblet_squat3"]);
        setLegCurls1(data["leg_curls1"]);
        setLegCurls2(data["leg_curls2"]);
        setLegCurls3(data["leg_curls3"]);
        setLegExtensions1(data["leg_extensions1"]);
        setLegExtensions2(data["leg_extensions2"]);
        setLegExtensions3(data["leg_extensions3"]);
        setHipAbductions1(data["hip_abductions1"]);
        setHipAbductions2(data["hip_abductions2"]);
        setHipAbductions3(data["hip_abductions3"]);
        setLegPress1(data["leg_press1"]);
        setLegPress2(data["leg_press2"]);
        setLegPress3(data["leg_press3"]);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);

      const updates = {
        user_id: user.id,
        calf_raises1: calfRaises1,
        calf_raises2: calfRaises2,
        calf_raises3: calfRaises3,
        hack_squat1: hackSquat1,
        hack_squat2: hackSquat2,
        hack_squat3: hackSquat3,
        calf_press1: calfPress1,
        calf_press2: calfPress2,
        inward_calf_press1: inwardCalfPress1,
        inward_calf_press2: inwardCalfPress2,
        outward_calf_press1: outwardCalfPress1,
        outward_calf_press2: outwardCalfPress2,
        goblet_squat1: gobletSquat1,
        goblet_squat2: gobletSquat2,
        goblet_squat3: gobletSquat3,
        leg_curls1: legCurls1,
        leg_curls2: legCurls2,
        leg_curls3: legCurls3,
        leg_extensions1: legExtensions1,
        leg_extensions2: legExtensions2,
        leg_extensions3: legExtensions3,
        hip_abductions1: hipAbductions1,
        hip_abductions2: hipAbductions2,
        hip_abductions3: hipAbductions3,
        leg_press1: legPress1,
        leg_press2: legPress2,
        leg_press3: legPress3,
      };

      let { error } = await supabase.from("leg_day").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <p>Calf Raises</p>
        <label htmlFor="calfRaises1">set 1</label>
        <input
          id="calfRaises1"
          type="number"
          value={calfRaises1 || ""}
          onChange={(e) => setCalfRaises1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="calfRaises2">
          set 2
          <input
            id="calfRaises2"
            type="number"
            value={calfRaises2 || ""}
            onChange={(e) => setCalfRaises2(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="calfRaises3">set 3</label>
        <input
          id="calfRaises1"
          type="number"
          value={calfRaises3 || ""}
          onChange={(e) => setCalfRaises3(e.target.value)}
        />
      </div>
      <p>Hack Squats</p>
      <div>
        <label htmlFor="hackSquat1">set 1</label>
        <input
          id="hackSquat1"
          type="number"
          value={hackSquat1 || ""}
          onChange={(e) => setHackSquat1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="hackSquat2">set 2</label>
        <input
          id="hackSquat2"
          type="number"
          value={hackSquat2 || ""}
          onChange={(e) => setHackSquat2(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="hackSquat3">set 3</label>
        <input
          id="hackSquat3"
          type="number"
          value={hackSquat3 || ""}
          onChange={(e) => setHackSquat3(e.target.value)}
        />
      </div>
      <p>Calf Press</p>
      <div>
        <label htmlFor="calfPress1">set 1</label>
        <input
          id="calfPress1"
          type="number"
          value={calfPress1 || ""}
          onChange={(e) => setCalfPress1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="calfPress2">set 2</label>
        <input
          id="calfPress2"
          type="number"
          value={calfPress2 || ""}
          onChange={(e) => setCalfPress2(e.target.value)}
        />
      </div>
      <p>Inward Calf Press</p>
      <div>
        <label htmlFor="inwardCalfPress1">set 1</label>
        <input
          id="inwardCalfPress1"
          type="number"
          value={inwardCalfPress1 || ""}
          onChange={(e) => setInwardCalfPress1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="inwardCalfPress2">set 2</label>
        <input
          id="inwardCalfPress2"
          type="number"
          value={inwardCalfPress2 || ""}
          onChange={(e) => setInwardCalfPress2(e.target.value)}
        />
      </div>
      <p>Outward Calf Press</p>
      <div>
        <label htmlFor="outwardCalfPress1">set 1</label>
        <input
          id="outwardCalfPress1"
          type="number"
          value={outwardCalfPress1 || ""}
          onChange={(e) => setOutwardCalfPress1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="outwardCalfPress2">set 2</label>
        <input
          id="outwardCalfPress2"
          type="number"
          value={outwardCalfPress2 || ""}
          onChange={(e) => setOutwardCalfPress2(e.target.value)}
        />
      </div>
      <p>Goblet Squats</p>
      <div>
        <label htmlFor="gobletSquats1">set 1</label>
        <input
          id="gobletSquats1"
          type="number"
          value={gobletSquat1 || ""}
          onChange={(e) => setGobletSquat1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="gobletSquats2">set 2</label>
        <input
          id="gobletSquats2"
          type="number"
          value={gobletSquat2 || ""}
          onChange={(e) => setGobletSquat2(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="gobletSquats3">set 3</label>
        <input
          id="gobletSquats3"
          type="number"
          value={gobletSquat3 || ""}
          onChange={(e) => setGobletSquat3(e.target.value)}
        />
      </div>
      <p>Leg Curls</p>
      <div>
        <label htmlFor="legCurls1">set 1</label>
        <input
          id="legCurls1"
          type="number"
          value={legCurls1 || ""}
          onChange={(e) => setLegCurls1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="legCurls2">set 2</label>
        <input
          id="legCurls2"
          type="number"
          value={legCurls2 || ""}
          onChange={(e) => setLegCurls2(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="legCurls3">set 3</label>
        <input
          id="legCurls3"
          type="number"
          value={legCurls3 || ""}
          onChange={(e) => setLegCurls3(e.target.value)}
        />
      </div>
      <p>Leg Extensions</p>
      <div>
        <label htmlFor="legExtensions1">set 1</label>
        <input
          id="legExtensions1"
          type="number"
          value={legExtensions1 || ""}
          onChange={(e) => setLegExtensions1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="legExtensions2">set 2</label>
        <input
          id="legExtensions2"
          type="number"
          value={legExtensions2 || ""}
          onChange={(e) => setLegExtensions2(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="legExtensions3">set 3</label>
        <input
          id="legExtensions3"
          type="number"
          value={legExtensions3 || ""}
          onChange={(e) => setLegExtensions3(e.target.value)}
        />
      </div>
      <p>Hip Abductions</p>
      <div>
        <label htmlFor="hipAbductions1">set 1</label>
        <input
          id="hipAbductions1"
          type="number"
          value={hipAbductions1 || ""}
          onChange={(e) => setHipAbductions1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="hipAbductions2">set 2</label>
        <input
          id="hipAbductions2"
          type="number"
          value={hipAbductions2 || ""}
          onChange={(e) => setHipAbductions2(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="hipAbductions3">set 3</label>
        <input
          id="hipAbductions3"
          type="number"
          value={hipAbductions3 || ""}
          onChange={(e) => setHipAbductions3(e.target.value)}
        />
      </div>
      <p>Leg Press</p>
      <div>
        <label htmlFor="legPress1">set 1</label>
        <input
          id="legPress1"
          type="number"
          value={legPress1 || ""}
          onChange={(e) => setLegPress1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="legPress2">set 2</label>
        <input
          id="legPress2"
          type="number"
          value={legPress2 || ""}
          onChange={(e) => setLegPress2(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="legPress3">set 3</label>
        <input
          id="legPress3"
          type="number"
          value={legPress3 || ""}
          onChange={(e) => setLegPress3(e.target.value)}
        />
      </div>
      <br />
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile()}
          disabled={loading}
        >
          {loading ? "loading.." : "update"}
        </button>
      </div>
      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
