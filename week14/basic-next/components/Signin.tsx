export const SigninComp = () => {

    function handler() {
        console.log("clicked ")
    }
    return (
        <div className="flex justify-center items-center ">
            <div className="flex flex-col justify-center items-center gap-4 p-6 rounded-2xl shadow-lg bg-white">
                <h2 className="text-xl font-semibold">Sign In from component</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                // onClick={handler}
                >
                    Click me
                </button>
                {/*  we cannot directly pass handler in the button, we have to make this signin component as a 'client side component' */}

            </div>
        </div>
    );
};
