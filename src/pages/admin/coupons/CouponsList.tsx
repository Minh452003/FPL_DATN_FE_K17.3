import { useGetCouponQuery, useRemoveCouponMutation } from '@/api/couponsApi';
import { ICoupon } from '@/interfaces/coupon';
import { Button, Skeleton, Table, Alert } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCirclePlus, FaTrashCan, FaWrench } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from 'date-fns';


const CouponsList = () => {
  const { data, error, isLoading }: any = useGetCouponQuery();
  const [removeCoupon, { isLoading: isRemoveLoading }] = useRemoveCouponMutation();
  const coupon = data?.coupon
  const dataSource = coupon?.map(({ _id, coupon_name, coupon_code, coupon_content,
    coupon_quantity, discount_amount, expiration_date, min_purchase_amount }: ICoupon) => {
    const formattedExpirationDate = expiration_date ? format(new Date(expiration_date), 'dd/MM/yyyy') : '';
    return {
      key: _id,
      coupon_name,
      coupon_code,
      coupon_content,
      coupon_quantity,
      discount_amount,
      expiration_date: formattedExpirationDate,
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
          'Phiếu giảm giá xoá thất bại.',
          'error'
        )
      }
    })
  }
  const columns = [
    {
      title: 'Phiếu giảm giá',
      dataIndex: 'coupon_name',
      key: 'coupon_name',
    },
    {
      title: 'Mã giảm giá',
      dataIndex: 'coupon_code',
      key: 'coupon_code',
    },
    {
      title: 'Nội dung phiếu giảm giá',
      dataIndex: 'coupon_content',
      key: 'coupon_content',
    },
    {
      title: 'Số lượng',
      dataIndex: 'coupon_quantity',
      key: 'coupon_quantity',
    },
    {
      title: '% giảm giá (1-100%)',
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
      title: 'Chức năng',
      render: ({ key: _id }: any) => {
        return (
          <div style={{ width: '150px' }}>
            <Button className='mr-1 text-red-500' onClick={() => deleteCoupon(_id)}>
              {isRemoveLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <FaTrashCan />
              )}
            </Button>
            <Button className='mr-1 text-blue-500'>
              <Link to={`/admin/coupons/edit/${_id}`}><FaWrench /></Link>
            </Button>
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
      <h3 className="font-semibold">Danh sách phiếu giảm giá</h3>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        <Button className='text-blue-500'>
          <Link to="/admin/coupons/add"><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link>
        </Button>
        <Table dataSource={dataSource} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
      </div>
    </div>
  );
}

export default CouponsList;



