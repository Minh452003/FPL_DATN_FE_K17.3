import { useGetCategoryQuery } from "@/api/categoryApi";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";


const Categories = () => {
    const { data: categories, error, isLoading: isLoadingFetching }: any = useGetCategoryQuery();
    if (isLoadingFetching) return <Skeleton />;
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
        <section className="cate-pro">
            <div className="container">
                <div className="row">
                    {categories.category.docs.map((category: any) => (
                        <div key={category._id} className="col-lg-4 col-md-4 col-sm-4 col-xs-6 a">
                            <Link to={''} className="tl" title="Phòng Khách">
                                <p className="ttt">
                                    {category?.category_name}
                                    <span>Xem sản phẩm</span>
                                </p>
                                <picture>
                                    <img
                                        alt="Phòng Khách"
                                        src={category.category_image?.url}
                                        className="w-full h-80"
                                    />
                                </picture>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories