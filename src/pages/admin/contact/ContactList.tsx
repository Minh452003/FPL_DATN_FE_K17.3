import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Table, Button } from 'antd';
import Swal from 'sweetalert2';
import { useGetAllContactQuery, useRemoveForceContactMutation } from '@/api/contactApi';
import { FaTrashCan } from 'react-icons/fa6';

const ContactList = () => {
  const [removeContact, { isLoading: isRemoveLoading }] = useRemoveForceContactMutation();
  const { data }: any = useGetAllContactQuery();
  const contacts = data?.contact.docs

  const datacontact = contacts?.map((contact: any, index: number) => {
    return {
      key: contact._id,
      STT: index + 1,
      contact_name: contact.contact_name,
      contact_email: contact.contact_email,
      contact_phone: contact.contact_phone,
      contact_description: contact.contact_description,
    }
  });

  const deleteContact = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi xoá không thể phục hồi lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa sản phẩm
        removeContact(id).then(() => {
          Swal.fire(
            'Xoá thành công!',
            'Liên hệ của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Thất bại',
          'Liên hệ xóa thất bại.',
          'error'
        )
      }
    })
  }


  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      render: (index: any) => <a>{index}</a>,
    },
    {
      title: 'Họ tên',
      dataIndex: 'contact_name',
      key: ' contact_name',
    },
    {
      title: 'Email',
      dataIndex: 'contact_email',
      key: 'contact_email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'contact_email',
      key: 'contact_email',
    },
    {
      title: 'Mô tả',
      dataIndex: 'contact_description',
      key: 'contact_description',
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: any) => {
        return (
          <div style={{ width: '150px' }}>
            <Button className='mr-1 text-red-500' onClick={() => deleteContact(_id)}>
              {isRemoveLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <FaTrashCan />
              )}
            </Button>

          </div>
        )
      }
    },

  ];
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách liên hệ</h3>
      <br />
      <Table dataSource={datacontact} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
    </div>

  )
}

export default ContactList;