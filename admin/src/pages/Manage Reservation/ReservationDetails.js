import { useNavigate } from "react-router";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";

const ReservationDetails = () => {
  const navigate = useNavigate();

  return (
    <PanelLayout>
      <SubHeader label="Reservation Details" />
      <div class="ct_white_bg h-auto">
        <div class="ct_px_30_new pt-4">
          <ul class="ct_view_profile_list">
            <li>
              <p class="mb-0 ct_fw_600">Host Name :</p>
              <p class="mb-0">James Brown</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Guest Name :</p>
              <p class="mb-0">Emma Thompson</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Booking ID :</p>
              <p class="mb-0">BK-2401</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Check-In :</p>
              <p class="mb-0">2024-02-15</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Check-Out :</p>
              <p class="mb-0">2024-02-20</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Property :</p>
              <p class="mb-0">Beachfront Resort</p>
            </li>

            <li>
              <p class="mb-0 ct_fw_600">Status :</p>
              <p class="mb-0">
                <span class="ct_green_clr ct_fw_600">Active</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </PanelLayout>
  );
};

export default ReservationDetails;
