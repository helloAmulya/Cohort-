// import React, { useState } from "react";

// function ModalPopBox() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [bcl, setBcl] = useState("");

//   function handleModalOpen() {
//     setBcl("hidden");
//     setIsOpen(true);
//   }

//   function handleModalClose() {
//     setIsOpen(false);
//     setBcl("visible");
//   }

//   return (
//     <div>
//       <button
//         className={`shadow shadow-gray-500 ${bcl}`}
//         onClick={handleModalOpen}
//       >
//         Click Me
//       </button>

//       {isOpen && (
//         <div className="p-4 border rounded bg-white shadow-md max-w-md mx-auto mt-4">
//           <h2 className="text-xl font-semibold mb-2">Modal Heading</h2>
//           <p className="mb-4 text-black/80">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
//             corrupti harum ad quis ex illum at esse dolores unde molestiae?
//           </p>
//           <button
//             onClick={handleModalClose}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ModalPopBox;
import React, { useState } from "react";

function ModalPopBox() {
  const [isOpen, setIsOpen] = useState(false);

  function handleModalOpen() {
    setIsOpen(true);
  }

  function handleModalClose() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        className="shadow shadow-gray-500 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleModalOpen}
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Modal Heading</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <button
              onClick={handleModalClose}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>

        
      )}
    </div>
  );
}

export default ModalPopBox;
