import { useGetNewsQuery } from "@/api/newsApi";

const NewsComponent = () => {
  const { data } = useGetNewsQuery();
  console.log(data);
  const newList = data?.news?.docs;
  console.log(newList);

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
                      <a
                        href="/thiet-ke-phong-bep-hien-dai-2020"
                        title="Thiết kế phòng bếp hiện đại 2020"
                      >
                        <img
                          className="lazyload loaded object-fill h-48 w-96"
                          src={newItems.new_image.url}
                          alt="Thiết kế phòng bếp hiện đại 2020"
                        />
                      </a>
                    </div>
                    <div className="px-3">
                      <h3>
                        <a
                          href="/thiet-ke-phong-bep-hien-dai-2020"
                          title="Thiết kế phòng bếp hiện đại 2020"
                        >
                          {newItems.new_name}
                        </a>{" "}
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
            <a href="tin-tuc" title="Xem tất cả">
              Xem tất cả
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsComponent;
