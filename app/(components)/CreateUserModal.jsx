"use client";

import { useState } from "react";
import CreateUserForm from "@/app/(components)/CreateUserForm";

const CreateUserModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={toggleModal}>
        Create
      </button>

      {isModalOpen && (
        <dialog id="create-user-modal" className="modal" open>
          <div className="modal-box p-10 border-2 rounded-xl border-gray-700">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={toggleModal}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-2xl mb-4 text-primary">Create</h3>
            <CreateUserForm />
          </div>
        </dialog>
      )}
    </>
  );
};

export default CreateUserModal;
