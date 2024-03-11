import { Map } from "@/components/map";
import { updateLocation } from "@/components/map";

export default function Home() {
  return (
    <main>
      <Map />
      <updateLocation />
    </main>
  );
}
