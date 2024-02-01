import React, { useState } from "react";

const SalaryDetails = () => {
  const [formData, setFormData] = useState({
    bankAccountName: "",
    ifscCode: "",
    accountNumber: "",
    uanNumber: "",
    epfo: "",
    pan: "",
    annualSalary: "",
    monthlySalary: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If the changed field is 'annualSalary', calculate 'monthlySalary'
    if (name === "annualSalary") {
      const annualSalary = parseFloat(value);
      const monthlySalary = isNaN(annualSalary)
        ? ""
        : (annualSalary / 12).toFixed(2);

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        monthlySalary,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can perform form submission logic here
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Salary Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="bankAccountName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Bank Account Name
                </label>
                <input
                  type="text"
                  id="bankAccountName"
                  name="bankAccountName"
                  value={formData.bankAccountName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="ifscCode"
                  className="block text-sm font-medium text-gray-600"
                >
                  IFSC Code
                </label>
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-gray-600"
                >
                  Account No
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="uanNumber"
                  className="block text-sm font-medium text-gray-600"
                >
                  UAN No
                </label>
                <input
                  type="text"
                  id="uanNumber"
                  name="uanNumber"
                  value={formData.uanNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="epfo"
                  className="block text-sm font-medium text-gray-600"
                >
                  EPFO No
                </label>
                <input
                  type="text"
                  id="epfo"
                  name="epfo"
                  value={formData.epfo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pan"
                  className="block text-sm font-medium text-gray-600"
                >
                  Pan No
                </label>
                <input
                  type="text"
                  id="pan"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="annualSalary"
                  className="block text-sm font-medium text-gray-600"
                >
                  Annual Salary
                </label>
                <input
                  type="text"
                  id="annualSalary"
                  name="annualSalary"
                  value={formData.annualSalary}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="monthlySalary"
                  className="block text-sm font-medium text-gray-600"
                >
                  Monthly Salary
                </label>
                <input
                  type="text"
                  id="monthlySalary"
                  name="monthlySalary"
                  value={formData.monthlySalary}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
            </div>
            {/* Add more fields as needed */}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalaryDetails;
