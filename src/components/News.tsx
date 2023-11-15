import { useGetNewsQuery } from "@/api/newsApi";
import { Link } from "react-router-dom";

const NewsComponent = () => {
  const { data }: any = useGetNewsQuery();
  const newList = data?.news?.docs;

  return (
    <div className="main-col5">
      <section className="latest-blog">
        <div className="container">
          <div
            className="blog-title  new_title lt"
            style={{ background: "none" }}
          >
            <h1>
              <a href="tin-tuc" title="Kiến thức Phong Thủy">
                <span>Kiến thức Phong Thủy</span>
              </a>
            </h1>
          </div>

          <div className="row x">
            {newList &&
              newList.map((newItems: any, index: number) => (
                <div
                  key={index}
                  className="col-xs-12 col-sm-6 col-md-4 item_bl_index"
                >
                  <div className="blog_inner border rounded-lg">
                    <div className="blog-img blog-l">
                      <Link
                        to={''}
                      >
                        <img
                          className="lazyload loaded object-fill h-48 w-96"
                          src={newItems.new_image.url}
                          alt="Thiết kế phòng bếp hiện đại 2020"
                        />
                      </Link>
                    </div>
                    <div className="px-3">
                      <h3>
                        <Link
                          to={''}
                        >
                          {newItems.new_name}
                        </Link>{" "}
                      </h3>
                      <p className="justify">
                        {newItems.new_description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="view_more">
            <Link to={''} title="Xem tất cả">
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsComponent;
