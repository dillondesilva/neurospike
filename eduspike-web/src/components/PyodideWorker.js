import { loadPyodide } from "pyodide";
import { useEffect } from "react";

export default function PyodideWorker(props) {
    useEffect(() => {
        async function createPyodideInstance() {
            let pyodide = await loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/npm/pyodide@0.23.4/"
            });
            
            await pyodide.loadPackage("./pyodide/numpy-1.24.2-cp311-cp311-emscripten_3_1_32_wasm32.whl");
            await pyodide.loadPackage('./pyodide/neurospikelib-0.1.0-py3-none-any.whl');
            console.log("loaded")
            props.setterPyodideInstance(pyodide);
        }

        // Initialize pyodide instance in parent component
        createPyodideInstance();
    }, []);
}