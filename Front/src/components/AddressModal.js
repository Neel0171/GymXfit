// AddressModal.js
import React, { useState } from 'react';
import Select from 'react-select';
import { State, City } from 'country-state-city';

const AddressModal = ({ setAddress }, { address }) => {
    const changeAddress = (a) => {
        if(a.addresstype && a.state && a.city && a.flat && a.pin) {
            setAddress(JSON.stringify(a));
        }
    }
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
                                <Select id="addressType" options={addressTypeOptions} placeholder="Select Address Type" onChange={setAddressType}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State<span className="text-danger">*</span></label>
                                <Select
                                    id="state"
                                    options={stateOptions}
                                    placeholder="Select State"
                                    onChange={setSelectedState}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City<span className="text-danger">*</span></label>
                                <Select
                                    id="city"
                                    options={cityOptions}
                                    placeholder="Select City"
                                    onChange={setSelectedCity}
                                    isDisabled={!selectedState}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="flatHouse" className="form-label">Flat/House No./Building Name<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="flatHouse" placeholder="Enter Flat/House No./Building Name" value={selectedFlat} onChange={(e) => setSelectedFlat(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="areaStreet" className="form-label">Area/Street Name</label>
                                <input type="text" className="form-control" id="areaStreet" placeholder="Enter Area/Street Name" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pincode" className="form-label">Pin Code<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="pincode" placeholder="Enter Pin Code" value={selectedPin} onChange={(e) => setSelectedPin(e.target.value)} />
                            </div>
                        </>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => changeAddress({addresstype: addressType, state: selectedState, city: selectedCity, flat: selectedFlat, area: selectedArea, pin: selectedPin})}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressModal;
