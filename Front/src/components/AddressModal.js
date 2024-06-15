// AddressModal.js
import React, { useState } from 'react';
import Select from 'react-select';
import { State, City } from 'country-state-city';

const AddressModal = ({ setAddress }) => {

    const addressTypeOptions = [
        { value: 'billing', label: 'Billing Address' },
        { value: 'member', label: 'Member Address' },
        { value: 'invoice', label: 'Invoice Address' },
        { value: 'staff', label: 'Staff Address' },
    ];

    const [addressType, setAddressType] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedFlat, setSelectedFlat] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedPin, setSelectedPin] = useState(null);

    const stateOptions = State.getStatesOfCountry('IN').map((state) => ({
        value: state.isoCode,
        label: state.name,
    }));

    const cityOptions = selectedState
        ? City.getCitiesOfState('IN', selectedState.value).map((city) => ({
            value: city.name,
            label: city.name,
        }))
        : [];

    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        if (!addressType) newErrors.addressType = 'Address Type is required';
        if (!selectedState) newErrors.selectedState = 'State name is required';
        if (!selectedCity) newErrors.selectedCity = 'City name is required';
        if (!selectedFlat) newErrors.selectedFlat = 'Flat/House No./Building name is required';
        if (!selectedPin) newErrors.selectedPin = 'Pin Code is required';
        return newErrors;
    };

    const handleSaveChanges = () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const addressData = {
                addresstype: addressType,
                state: selectedState,
                city: selectedCity,
                flat: selectedFlat,
                area: selectedArea,
                pin: selectedPin
            };
            console.log(addressData);
            setAddress(JSON.stringify(addressData));
            setErrors({});

            const modalElement = document.getElementById('addressModal');
            const modal = window.bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }
        }
    };

    const handleReset = () => {
        setAddressType(null);
        setSelectedState(null);
        setSelectedCity(null);
        setSelectedFlat('');
        setSelectedArea('');
        setSelectedPin('');
        setErrors({});
    };

    return (
        <div className="modal fade modal-dialog-center" id="addressModal" tabIndex="-1" aria-labelledby="addressModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addressModalLabel">Enter Address Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <>
                            <div className="mb-3">
                                <label htmlFor="addressType" className="form-label">Address Type<span className="text-danger">*</span></label>
                                <Select 
                                    id="addressType" 
                                    options={addressTypeOptions} 
                                    placeholder="Select Address Type" 
                                    onChange={setAddressType} 
                                    value={addressType} 
                                />
                                {errors.addressType && <div className="text-danger text-end">{errors.addressType}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State<span className="text-danger">*</span></label>
                                <Select
                                    id="state"
                                    options={stateOptions}
                                    placeholder="Select State"
                                    onChange={setSelectedState}
                                    value={selectedState}
                                />
                                {errors.selectedState && <div className="text-danger text-end">{errors.selectedState}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City<span className="text-danger">*</span></label>
                                <Select
                                    id="city"
                                    options={cityOptions}
                                    placeholder="Select City"
                                    onChange={setSelectedCity}
                                    isDisabled={!selectedState}
                                    value={selectedCity}
                                />
                                {errors.selectedCity && <div className="text-danger text-end">{errors.selectedCity}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="flatHouse" className="form-label">Flat/House No./Building Name<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="flatHouse" placeholder="Enter Flat/House No./Building Name" value={selectedFlat} onChange={(e) => setSelectedFlat(e.target.value)} />
                                {errors.selectedFlat && <div className="text-danger text-end">{errors.selectedFlat}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="areaStreet" className="form-label">Area/Street Name</label>
                                <input type="text" className="form-control" id="areaStreet" placeholder="Enter Area/Street Name" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pincode" className="form-label">Pin Code<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="pincode" placeholder="Enter Pin Code" value={selectedPin} onChange={(e) => setSelectedPin(e.target.value)} />
                                {errors.selectedPin && <div className="text-danger text-end">{errors.selectedPin}</div>}
                            </div>
                        </>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressModal;
