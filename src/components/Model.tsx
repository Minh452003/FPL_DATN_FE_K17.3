import React, { useState } from "react";
import { Button, Modal } from "antd";

const Model = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} className="button btn-cart rounded-none">
        Mua hàng
      </Button>
      <Modal
        title="Mua ngay"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex">
          <div className="w-[250px]">
            <div>
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgi4k1sbv187e3"
                alt=""
                width={300}
              />
            <div className="flex gap-2 mt-5">
              <div>
              <img
                  className="mr-2"
                  src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgi4k1sbv187e3"
                  alt=""
                
                />
              </div>
              <div>
              <img
                  className="mr-2"
                  src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgi4k1sbv187e3"
                  alt=""
                
                />
              </div>
              <div>
              <img
                  className="mr-2"
                  src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgi4k1sbv187e3"
                  alt=""
                 
                />
              </div>
              <div>
              <img
                  className="mr-2"
                  src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgi4k1sbv187e3"
                  alt=""
                  
                />
              </div>
              </div>
            </div>
          </div>
          <div className="ml-2">
            <div>
              <h3 className="text-[16px]">Bàn trà gỗ tự nhiên 2CBT-111</h3>
              <span className="text-red-600 font-bold">5.000.000đ</span>
            </div>
            <div>
              <h3 className="text-[13px] mt-3">Màu sắc</h3>
              <button
                className="hover:bg-red-500 bg-gray-300 p-1 mr-2 mt-2 text-[12px]"
                aria-label="M"
                aria-disabled="false"
              >
                Đỏ
              </button>
              <button
                className="hover:bg-red-500 bg-gray-300 p-1 mr-2 mt-2 text-[12px]"
                aria-label="M"
                aria-disabled="false"
              >
                vàng
              </button>
              <button
                className="hover:bg-red-500 bg-gray-300 p-1 mt-2 text-[12px]"
                aria-label="M"
                aria-disabled="false"
              >
                xanh
              </button>
            </div>
            <div className="mt-3">
              <h3 className="text-[13px]">Kích Thước</h3>
              <button
                className="hover:bg-red-500 bg-gray-300 p-1 mr-2 mt-2 text-[12px]"
                aria-label="M"
                aria-disabled="false"
              >
                40 cm
              </button>
              <button
                className="hover:bg-red-500 bg-gray-300 p-1 mr-2 mt-2 text-[12px]"
                aria-label="M"
                aria-disabled="false"
              >
                40 cm
              </button>
              <button
                className="hover:bg-red-500 bg-gray-300 p-1 mt-2 text-[12px]"
                aria-label="M"
                aria-disabled="false"
              >
                40 cm
              </button>
            </div>
            <div className="flex mt-4">
              <div className="items-center">
                <h3 className="text-[13px] ">Số Lượng</h3>
              </div>
              <div className="flex ml-2">
                <button
                  aria-label="Decrease"
                  className="btn3 btn-solid-primary3  w-5 h-6" 
                >
                  -
                </button>
                <input
                  className="btn4 btn-solid-primary4 outline-none mn w-12 h-6" 
                  aria-live="assertive"
                  aria-valuenow={1}
                />
                <button
                  aria-label="Increase"
                  className="btn5 btn-solid-primary5  w-5 h-6" 
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Model;
