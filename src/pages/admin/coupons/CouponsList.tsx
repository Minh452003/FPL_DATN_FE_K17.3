import { useGetCouponQuery, useRemoveCouponMutation } from '@/api/couponsApi';
import { ICoupon } from '@/interfaces/coupon';
import { Button, Skeleton, Table, Alert } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCirclePlus, FaTrashCan, FaWrench } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const CouponsList = () => {
  const { data, error, isLoading }: any = useGetCouponQuery();
  const [removeCoupon, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveCouponMutation();
  const coupon = data?.coupon
  const dataSource = coupon?.map(({_id, coupon_name, coupon_code, coupon_content, 
    coupon_quantity, discount_amount, expiration_date, min_purchase_amount}: ICoupon) => {
    return {
      key: _id,
      coupon_name,
      coupon_code,
      coupon_content,
      coupon_quantity,
      discount_amount,
      expiration_date,
      min_purchase_amount
    }
  })
  const deleteCoupon = (id: any) => {
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
        removeCoupon(id).then(() => {
          Swal.fire(
            'Xoá thành công!',
            'Phiếu giảm giá của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Phiếu giảm giá xoá thất bại :)',
          'error'
        )
      }
    })
  }
  const columns = [
    {
      title: 'Tên phiếu giảm giá',
      dataIndex: 'coupon_name',
      key: 'coupon_name',
    },
    {
      title: 'Mã phiếu giảm giá',
      dataIndex: 'coupon_code',
      key: 'coupon_code',
    },
    {
      title: 'Nội dung phiếu giảm giá',
      dataIndex: 'coupon_content',
      key: 'coupon_content',
    },
    {
      title: 'Số lượng phiếu giảm giá',
      dataIndex: 'coupon_quantity',
      key: 'coupon_quantity',
    },
    {
      title: 'Số tiền chiết khấu',
      dataIndex: 'discount_amount',
      key: 'discount_amount',
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
    },
    {
        title: 'Số tiền mua tối thiểu',
        dataIndex: 'min_purchase_amount',
        key: 'min_purchase_amount',
      },
    {
      title: 'Action',
      key: 'action',
      render: ({ key: _id }: any) => {
        return (
            <div className='flex w-40'>
                <>
                <Button onClick={() => deleteCoupon(_id)}>
                {isRemoveLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                    <FaTrashCan style={{ fontSize: '20', display: 'block' }} />
                )}
                </Button>
                <Button type="primary" danger className="ml-2">
                <Link to={`/admin/coupon/edit/${_id}`}><FaWrench /></Link>
                </Button>
                </>
            </div>
          
        )
      }
    },
  ];
  if (isLoading) return <Skeleton />;
  if (error) {
    if ("data" in error && "status" in error) {
      return (
        <div>
          {error.status} - {JSON.stringify(error.data)}
        </div>
      );
    }
  }
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách Phiếu giảm giá</h3>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        {isRemoveSuccess && <Alert message="Xoa thanh cong" type="success" />}
        <Button className='text-blue-500'>
          <Link to="/admin/coupon/add"><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link>
        </Button>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
}

export default CouponsList;



