import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import { useSelector, useDispatch } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import DeleteModal from "../../components/modal/DeleteModal";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import { deleteBlog, fetchBlogs } from "../../redux/actions/authAction";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import ImageWithPreview from "../../shared/components/image preview/imageWithPreview";

const BlogManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blogId, setBlogId] = useState("");
  const [isViewModal, setIsViewModal] = useState(false);
  const { blogTableHeading, blogList, isLoading } = useSelector(
    (state) => state.authReducers
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);


  const paginatedList = blogList?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages
  );

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const handleDeleteBlog = () => {
    const callback = (res) => {
      if (res?.success) {
        setIsViewModal(false)
        dispatch(fetchBlogs());
      }
    };
    dispatch(deleteBlog({ payload: blogId, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
        <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text">
          Blog Management
        </h4>
      
      <div className="">
        <div className="ct_w_100_767">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(pageRoutes.addBlog);
            }}
            className="ct_orange_btn ct_btn_h_50"
          >
            + Add Blog
          </a>
        </div>
      </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={blogTableHeading} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <ImageWithPreview
                        image={item?.blogImage ? item?.blogImage[0]?.image : ""}
                        className="ct_img_40 ct_border_radius_100 ct_cursor_pointer"
                      />
                    </td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.title ?? "#N/A"}
                      </span>
                    </td>
                    <td>
                      <p className="ct_minimise_cnt description-data mb-0 ct_white_space_normal" dangerouslySetInnerHTML={{__html:item?.blog_content }}>
                       
                      </p>
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.blogDetails, {
                              state: { data: item },
                            });
                          }}
                          className="ct_text_39A1FF"
                        >
                          <i className="fa-solid fa-eye fs-5"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.editBlogs,{state:{data:item}});
                          }}
                          className="text-dark"
                        >
                          <i className="fa-solid fa-pencil fs-5"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setBlogId(item?.blog_id);
                            setIsViewModal(true);
                          }}
                          className="ct_red_clr"
                        >
                          <i className="fa-solid fa-trash-can fs-5"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paginatedList?.length <= 0 && <NoRecord />}
          </div>
          {paginatedList?.length != 0 && (
            <div className="d-flex ct_flex_col_575 gap-3 justify-content-between align-items-center mt-4">
              <div>
                <PaginationDropdown
                  onChange={(val) => {
                    setListPerPages(val);
                    setCurrentPage(0);
                  }}
                />
              </div>
              <div>
                <ReactPagination
                  pageCount={Math.ceil(blogList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <DeleteModal
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
        heading="Delete Blog"
        handleDelete={handleDeleteBlog}
        value="Are you sure you want to delete this Blog?"
      />
    </PanelLayout>
  );
};

export default BlogManagement;
