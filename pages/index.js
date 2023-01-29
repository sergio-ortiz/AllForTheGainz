import { supabase } from "../lib/supabaseClient";

function Page({ workouts }) {
  return (
    <ul>
      {workouts.map((workout) => (
        <li key={workout.id}>{workout.name}</li>
      ))}
    </ul>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("workouts").select();

  return {
    props: {
      workouts: data,
    },
  };
}

export default Page;
