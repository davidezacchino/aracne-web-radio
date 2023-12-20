import {component$} from "@builder.io/qwik";
import GoogleMap from "~/components/map/GoogleMap";

export default component$(() => {


    return (
        <div style={{marginBottom: '10rem'}}>
            <GoogleMap/>
        </div>
    );
});
