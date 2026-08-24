const ManageRoles = ({
  modules = [],
  permissions = {},
  permissionTypes = ["add", "view", "edit", "delete"],
  onPermissionChange = () => {},
  onModuleAllChange = () => {},
  onColumnAllChange = () => {},
  onAllModulesChange = () => {},
  readOnly = false,
}) => {
  const isAllModulesChecked = () =>
    modules.every((mod) =>
      permissionTypes.every((perm) => permissions[mod]?.[perm])
    );

  const isColumnChecked = (permission) =>
    modules.every((mod) => permissions[mod]?.[permission]);

  return (
    <div className="table-responsive">
      <table className="table ct_transparent_table ct_border_table_0">
        <thead>
          <tr>
            <th>
              <div className="d-flex align-items-center gap-3">
                {!readOnly && (
                  <label className="ct_checkbox-container">
                    <input
                      className="ct_custom-checkbox"
                      type="checkbox"
                      checked={isAllModulesChecked()}
                      onChange={(e) => onAllModulesChange(e.target.checked)}
                    />
                    <span className="ct_checkmark"></span>
                  </label>
                )}
                <p className="mb-0 ct_line_h_27">All Modules</p>
              </div>
            </th>
            {permissionTypes.map((perm) => (
              <th key={perm}>
                <div className="d-flex align-items-center gap-3">
                  {!readOnly && (
                    <label className="ct_checkbox-container">
                      <input
                        className="ct_custom-checkbox"
                        type="checkbox"
                        checked={isColumnChecked(perm)}
                        onChange={(e) =>
                          onColumnAllChange(perm, e.target.checked)
                        }
                      />
                      <span className="ct_checkmark"></span>
                    </label>
                  )}
                  <p className="mb-0 ct_line_h_27">All</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modules.map((mod) => (
            <tr key={mod}>
              <td>
                <div className="d-flex align-items-center gap-3">
                  {!readOnly && (
                    <label className="ct_checkbox-container">
                      <input
                        className="ct_custom-checkbox"
                        type="checkbox"
                        checked={permissionTypes.every(
                          (perm) => permissions[mod]?.[perm]
                        )}
                        onChange={(e) =>
                          onModuleAllChange(mod, e.target.checked)
                        }
                      />
                      <span className="ct_checkmark"></span>
                    </label>
                  )}
                  <p className="mb-0 ct_line_h_27">{mod}</p>
                </div>
              </td>
              {permissionTypes.map((perm) => (
                <td key={perm}>
                  <div className="d-flex align-items-center gap-3">
                    <label className="ct_checkbox-container">
                      <input
                        className="ct_custom-checkbox"
                        type="checkbox"
                        checked={permissions[mod]?.[perm]}
                        onChange={(e) =>
                          onPermissionChange(mod, perm, e.target.checked)
                        }
                        readOnly={readOnly}
                      />
                      <span className="ct_checkmark"></span>
                    </label>
                    {/* {!readOnly ? (
                      <label className="ct_checkbox-container">
                        <input
                          className="ct_custom-checkbox"
                          type="checkbox"
                          checked={permissions[mod]?.[perm]}
                          onChange={(e) =>
                            onPermissionChange(mod, perm, e.target.checked)
                          }
                        />
                        <span className="ct_checkmark"></span>
                      </label>
                    ) : (
                      <span>
                       
                        {permissions[mod]?.[perm] ? "✅" : "❌"}
                      </span>
                    )} */}
                    <p className="mb-0 ct_line_h_27">
                      {perm.charAt(0).toUpperCase() + perm.slice(1)}
                    </p>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRoles;
