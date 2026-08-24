import { useState } from "react";
import WebFooter from "../../layout/WebFooter";
import WebHeader from "../../layout/WebHeader";
import RentalApplication from "../../components/pages/apartment/booking/RentalApplication";
import PaymentMethod from "../../components/pages/apartment/booking/PaymentMethod";
import Done from "../../components/pages/apartment/booking/Done";

const BookApartment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { label: "Rental Application", id: "account" },
    { label: "Payment Method", id: "personal" },
    { label: "Done", id: "confirm" },
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RentalApplication handleNext={handleNext} />;
      case 2:
        return <PaymentMethod handleNext={handleNext} handleBack={handleBack} />;
      case 3:
        return <Done />;

    }
  };

  return (
    <>
      <WebHeader />

      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ct_multistep_form_card px-0 pt-4 pb-0 mt-3 mb-3">
                <form id="msform">
                  {/* progressbar */}
                  <ul id="ct_form_progressbar">
                    {steps.map((item, index) => {
                      const stepNum = index + 1;
                      return (
                        <li
                          id={item?.id}
                          key={index}
                          className={`ct_flex_1 ${currentStep === stepNum
                              ? "active"
                              : currentStep > stepNum
                                ? "active"
                                : ""
                            }`}
                        >
                          <h5>{item?.label}</h5>
                        </li>
                      );
                    })}
                  </ul>
                  {renderStep()}

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WebFooter />
    </>
  );
};

export default BookApartment;
