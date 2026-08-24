import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import {
  getSeoManagementData,
  updateSeoManagementData,
} from "../../redux/actions/supportAction";

const PAGE_OPTIONS = [
  { label: "Home", value: "home" },
  { label: "Become a host", value: "become-host" },
  { label: "Properties", value: "properties" },
  { label: "Property Details", value: "property-details" },
  { label: "Blogs", value: "blogs" },
  { label: "Help", value: "help" },
];

const normalizePageSlug = (slug = "") => {
  const normalized = String(slug).trim().toLowerCase();
  if (normalized === "blog") return "blogs";
  return normalized;
};

const createSeoRow = () => ({
  id: Date.now() + Math.random(),
  page_name: "",
  meta_title: "",
  meta_description: "",
});

const SeoManagement = () => {
  const dispatch = useDispatch();
  const { seoLoading, seoManagementData } = useSelector(
    (state) => state.supportReducers
  );
  const [seoRows, setSeoRows] = useState([createSeoRow()]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const getSelectedPagesByOtherRows = (rowId) => {
    return seoRows
      .filter((row) => row.id !== rowId && row.page_name)
      .map((row) => row.page_name);
  };

  const handleRowChange = (rowId, field, value) => {
    setSeoRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row))
    );
  };

  const handleAddRow = () => {
    if (seoRows.length >= PAGE_OPTIONS.length) {
      toast.error(`You can add up to ${PAGE_OPTIONS.length} rows only.`);
      return;
    }
    setSeoRows((prev) => [...prev, createSeoRow()]);
  };

  const handleDeleteRow = (rowId) => {
    setSeoRows((prev) => {
      if (prev.length === 1) {
        return [createSeoRow()];
      }
      return prev.filter((row) => row.id !== rowId);
    });
  };

  useEffect(() => {
    const callback = () => {
      setIsInitialLoading(false);
    };
    dispatch(getSeoManagementData({ callback }));
  }, [dispatch]);

  useEffect(() => {
    const seoData = seoManagementData;
    const validPageValues = new Set(PAGE_OPTIONS.map((item) => item.value));

    if (!seoData) {
      setSeoRows([createSeoRow()]);
      return;
    }

    if (Array.isArray(seoData) && seoData.length) {
      const rows = seoData
        .map((item) => {
          const pageName = normalizePageSlug(item?.page_slug);
          if (!validPageValues.has(pageName)) return null;
          return {
            id: Date.now() + Math.random(),
            page_name: pageName,
            meta_title: item?.meta_title || "",
            meta_description: item?.meta_description || "",
          };
        })
        .filter(Boolean);

      if (rows.length) {
        setSeoRows(rows);
        return;
      }
    }

    if (Array.isArray(seoData?.seo_pages) && seoData.seo_pages.length) {
      const rows = seoData.seo_pages
        .map((item) => {
          const pageName = normalizePageSlug(item?.page_slug || item?.page_name);
          if (!validPageValues.has(pageName)) return null;
          return {
            id: Date.now() + Math.random(),
            page_name: pageName,
            meta_title: item?.meta_title || "",
            meta_description: item?.meta_description || "",
          };
        })
        .filter(Boolean);

      if (!rows.length) {
        setSeoRows([createSeoRow()]);
        return;
      }

      setSeoRows(rows);
      return;
    }

    const legacyRow = {
      id: Date.now() + Math.random(),
      page_name: normalizePageSlug(
        seoData?.page_slug || seoData?.page_name || ""
      ),
      meta_title: seoData?.meta_title || "",
      meta_description: seoData?.meta_description || "",
    };

    if (validPageValues.has(legacyRow.page_name)) {
      setSeoRows([legacyRow]);
    } else {
      setSeoRows([createSeoRow()]);
    }
  }, [seoManagementData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedRows = seoRows.map((row) => ({
      page_name: row.page_name.trim(),
      meta_title: row.meta_title.trim(),
      meta_description: row.meta_description.trim(),
    }));

    for (let index = 0; index < cleanedRows.length; index++) {
      const row = cleanedRows[index];
      if (!row.page_name) {
        toast.error(`Row ${index + 1}: Page Name is required.`);
        return;
      }
      if (!row.meta_title) {
        toast.error(`Row ${index + 1}: Meta Title is required.`);
        return;
      }
      if (!row.meta_description) {
        toast.error(`Row ${index + 1}: Meta Description is required.`);
        return;
      }
    }

    const pageIndexBySlug = {};
    for (let index = 0; index < cleanedRows.length; index++) {
      const slug = cleanedRows[index].page_name;
      if (pageIndexBySlug[slug] !== undefined) {
        toast.error(
          `Row ${index + 1}: Page Name already selected in Row ${pageIndexBySlug[slug] + 1}.`
        );
        return;
      }
      pageIndexBySlug[slug] = index;
    }

    const payload = cleanedRows.map((row) => ({
      page_slug: row.page_name,
      meta_title: row.meta_title,
      meta_description: row.meta_description,
    }));

    const callback = (response) => {
      if (response?.success) {
        dispatch(getSeoManagementData({}));
      }
    };

    dispatch(updateSeoManagementData({ payload, callback }));
  };

  if (isInitialLoading && seoLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <SubHeader label="SEO Management" />
      <div className="ct_white_bg">
        <div className="ct_px_30_new pt-4">
          <form onSubmit={handleSubmit}>
            {seoRows.map((row, index) => {
              const selectedByOtherRows = new Set(
                getSelectedPagesByOtherRows(row.id)
              );

              return (
                <div key={row.id} className="border rounded p-3 mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="mb-0 ct_fw_600 ct_fs_24">Row {index + 1}</h6>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="ct_orange_btn ct_border_radius_10 ct_h_40"
                        onClick={handleAddRow}
                        disabled={seoRows.length >= PAGE_OPTIONS.length}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger ct_h_40"
                        onClick={() => handleDeleteRow(row.id)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-4">
                        <label className="ct_fw_600 mb-2">Page Name</label>
                        <div>
                          <select
                            className="ct_input form-control  ct_border_op_10"
                            value={row.page_name}
                            onChange={(e) =>
                              handleRowChange(row.id, "page_name", e.target.value)
                            }
                          >
                            <option value="">Select Page</option>
                            {PAGE_OPTIONS.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                disabled={selectedByOtherRows.has(option.value)}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-4">
                        <label className="ct_fw_600 mb-2">Meta Title</label>
                        <input
                          type="text"
                          className="form-control ct_input ct_border_op_10"
                          placeholder="Meta Title"
                          value={row.meta_title}
                          onChange={(e) =>
                            handleRowChange(row.id, "meta_title", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-0">
                        <label className="ct_fw_600 mb-2">Meta Description</label>
                        <textarea
                          className="form-control ct_input ct_border_op_10 h-auto"
                          rows="5"
                          placeholder="Meta Description"
                          value={row.meta_description}
                          onChange={(e) =>
                            handleRowChange(
                              row.id,
                              "meta_description",
                              e.target.value
                            )
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              className="ct_orange_btn ct_border_radius_10 ct_h_40 ms-auto"
              type="submit"
              disabled={seoLoading}
            >
              {seoLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </PanelLayout>
  );
};

export default SeoManagement;
