import { loadPyodide } from "pyodide";
import { useEffect } from "react";

export default function PyodideWorker(props) {
    useEffect(() => {
        async function createPyodideInstance() {
            let pyodide = await loadPyodide({
                indexURL: window.location.origin + "/pyodide"
            });
            
            await pyodide.loadPackage('numpy');
            await pyodide.loadPackage('./pyodide/neurospikelib-0.1.0-py3-none-any.whl');
            console.log("loaded")
            props.setterPyodideInstance(pyodide);
        }

        // Initialize pyodide instance in parent component
        createPyodideInstance();
    }, []);
}