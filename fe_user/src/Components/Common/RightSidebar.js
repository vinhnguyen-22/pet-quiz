import React, { useState } from 'react';
import {
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
} from "reactstrap";

//redux
import {
    changeLayout,
    changeSidebarTheme,
    changeLayoutMode,
    changeLayoutWidth,
    changeLayoutPosition,
    changeTopbarTheme,
    changeLeftsidebarSizeType,
    changeLeftsidebarViewType,
    // resetValue
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

//import Constant
import {
    layoutTypes,
    leftSidebarTypes,
    layoutModeTypes,
    layoutWidthTypes,
    layoutPositionTypes,
    topbarThemeTypes,
    leftsidbarSizeTypes,
    leftSidebarViewTypes,
} from "../constants/layout";

//SimpleBar
import SimpleBar from "simplebar-react";

const RightSidebar = () => {
    const dispatch = useDispatch();
    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        // resetValue
    } = useSelector(state => ({
        layoutType: state.Layout.layoutType,
        leftSidebarType: state.Layout.leftSidebarType,
        layoutModeType: state.Layout.layoutModeType,
        layoutWidthType: state.Layout.layoutWidthType,
        layoutPositionType: state.Layout.layoutPositionType,
        topbarThemeType: state.Layout.topbarThemeType,
        leftsidbarSizeType: state.Layout.leftsidbarSizeType,
        leftSidebarViewType: state.Layout.leftSidebarViewType,
        // resetValue: state.Layout,
    }));

    // open offcanvas
    const [open, setOpen] = useState(true);
    const toggleLeftCanvas = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <div>
                <div className="customizer-setting d-none d-md-block">
                    <div onClick={toggleLeftCanvas} className="btn-info btn-rounded shadow-lg btn btn-icon btn-lg p-2">
                        <i className='mdi mdi-spin mdi-cog-outline fs-22'></i>
                    </div>
                </div>
                <Offcanvas isOpen={open} toggle={toggleLeftCanvas} direction="end" className="offcanvas-end border-0">
                    <OffcanvasHeader className="d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header-dark" toggle={toggleLeftCanvas}>
                        <span className="m-0 me-2 text-white">Theme Customizer</span>
                    </OffcanvasHeader>
                    <OffcanvasBody className="p-0">
                        <SimpleBar className="h-100">
                            <div className="p-4">
                                <h6 className="mb-0 fw-semibold text-uppercase">Layout</h6>
                                <p className="text-muted">Choose your layout</p>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                id="customizer-layout01"
                                                name="data-layout"
                                                type="radio"
                                                value={layoutTypes.VERTICAL}
                                                checked={layoutType === layoutTypes.VERTICAL}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        dispatch(changeLayout(e.target.value));
                                                    }
                                                }}
                                                className="form-check-input"
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout01">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Vertical</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                id="customizer-layout02"
                                                name="data-layout"
                                                type="radio"
                                                value={layoutTypes.HORIZONTAL}
                                                checked={layoutType === layoutTypes.HORIZONTAL}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        dispatch(changeLayout(e.target.value));
                                                    }
                                                }}
                                                className="form-check-input" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout02">
                                                <span className="d-flex h-100 flex-column gap-1">
                                                    <span className="bg-light d-flex p-1 gap-1 align-items-center">
                                                        <span className="d-block p-1 bg-soft-primary rounded me-1"></span>
                                                        <span className="d-block p-1 pb-0 px-2 bg-soft-primary ms-auto"></span>
                                                        <span className="d-block p-1 pb-0 px-2 bg-soft-primary"></span>
                                                    </span>
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Horizontal</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                id="customizer-layout03"
                                                name="data-layout"
                                                type="radio"
                                                value={layoutTypes.TWOCOLUMN}
                                                checked={layoutType === layoutTypes.TWOCOLUMN}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        dispatch(changeLayout(e.target.value));
                                                    }
                                                }}
                                                className="form-check-input" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout03">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1">
                                                            <span className="d-block p-1 bg-soft-primary mb-2"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Two Column</h5>
                                    </div>
                                </div>

                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Color Scheme</h6>
                                <p className="text-muted">Choose Light or Dark Scheme.</p>

                                <div className="colorscheme-cardradio">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-check card-radio">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="data-layout-mode"
                                                    id="layout-mode-light"
                                                    value={layoutModeTypes.LIGHTMODE}
                                                    checked={layoutModeType === layoutModeTypes.LIGHTMODE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            dispatch(changeLayoutMode(e.target.value));
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100" htmlFor="layout-mode-light">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">Light</h5>
                                        </div>

                                        <div className="col-4">
                                            <div className="form-check card-radio dark">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="data-layout-mode"
                                                    id="layout-mode-dark"
                                                    value={layoutModeTypes.DARKMODE}
                                                    checked={layoutModeType === layoutModeTypes.DARKMODE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            dispatch(changeLayoutMode(e.target.value));
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100 bg-dark" htmlFor="layout-mode-dark">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-soft-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-soft-light rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-soft-light d-block p-1"></span>
                                                                <span className="bg-soft-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">Dark</h5>
                                        </div>
                                    </div>
                                </div>
                                {layoutType !== layoutTypes.TWOCOLUMN && (
                                    <React.Fragment>
                                        <div id="layout-width">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Layout Width</h6>
                                            <p className="text-muted">Choose Fluid or Boxed layout.</p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-width"
                                                            id="layout-width-fluid"
                                                            value={layoutWidthTypes.FLUID}
                                                            checked={layoutWidthType === layoutWidthTypes.FLUID}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    dispatch(changeLayoutWidth(e.target.value));
                                                                    dispatch(changeLeftsidebarSizeType("lg"));
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="layout-width-fluid">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Fluid</h5>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-check card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-width"
                                                            id="layout-width-boxed"
                                                            value={layoutWidthTypes.BOXED}
                                                            checked={layoutWidthType === layoutWidthTypes.BOXED}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    dispatch(changeLayoutWidth(e.target.value));
                                                                    dispatch(changeLeftsidebarSizeType("sm-hover"));
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100 px-2" htmlFor="layout-width-boxed">
                                                            <span className="d-flex gap-1 h-100 border-start border-end">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Boxed</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="layout-position">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Layout Position</h6>
                                            <p className="text-muted">Choose Fixed or Scrollable Layout Position.</p>

                                            <div className="btn-group radio" role="group">
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="data-layout-position"
                                                    id="layout-position-fixed"
                                                    value={layoutPositionTypes.FIXED}
                                                    checked={layoutPositionType === layoutPositionTypes.FIXED}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            dispatch(changeLayoutPosition(e.target.value));
                                                        }
                                                    }}
                                                />
                                                <label className="btn btn-light w-sm" htmlFor="layout-position-fixed">Fixed</label>

                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="data-layout-position"
                                                    id="layout-position-scrollable"
                                                    value={layoutPositionTypes.SCROLLABLE}
                                                    checked={layoutPositionType === layoutPositionTypes.SCROLLABLE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            dispatch(changeLayoutPosition(e.target.value));
                                                        }
                                                    }}
                                                />
                                                <label className="btn btn-light w-sm ms-0" htmlFor="layout-position-scrollable">Scrollable</label>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}

                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Topbar Color</h6>
                                <p className="text-muted">Choose Light or Dark Topbar Color.</p>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="data-topbar"
                                                id="topbar-color-light"
                                                value={topbarThemeTypes.LIGHT}
                                                checked={topbarThemeType === topbarThemeTypes.LIGHT}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        dispatch(changeTopbarTheme(e.target.value));
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="topbar-color-light">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Light</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="data-topbar"
                                                id="topbar-color-dark"
                                                value={topbarThemeTypes.DARK}
                                                checked={topbarThemeType === topbarThemeTypes.DARK}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        dispatch(changeTopbarTheme(e.target.value));
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="topbar-color-dark">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-primary d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Dark</h5>
                                    </div>
                                </div>

                                {layoutType === "vertical" && (
                                    <React.Fragment>

                                        <div id="sidebar-size">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Size</h6>
                                            <p className="text-muted">Choose a size of Sidebar.</p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-default"
                                                            value={leftsidbarSizeTypes.DEFAULT}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.DEFAULT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    dispatch(changeLeftsidebarSizeType(e.target.value));
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-default">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Default</h5>
                                                </div>

                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-compact"
                                                            value={leftsidbarSizeTypes.COMPACT}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.COMPACT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    dispatch(changeLeftsidebarSizeType(e.target.value));
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-compact">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 bg-soft-primary rounded mb-2"></span>
                                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Compact</h5>
                                                </div>

                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-small"
                                                            value={leftsidbarSizeTypes.SMALLICON}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.SMALLICON}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    dispatch(changeLeftsidebarSizeType(e.target.value));
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-small">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1">
                                                                        <span className="d-block p-1 bg-soft-primary mb-2"></span>
                                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Small (Icon View)</h5>
                                                </div>

                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-small-hover"
                                                            value={leftsidbarSizeTypes.SMALLHOVER}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.SMALLHOVER}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    dispatch(changeLeftsidebarSizeType(e.target.value));
                                                                }
                                                            }}

                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-small-hover">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1">
                                                                        <span className="d-block p-1 bg-soft-primary mb-2"></span>
                                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Small Hover View</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="sidebar-view">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar View</h6>
                                            <p className="text-muted">Choose Default or Detached Sidebar view.</p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-style"
                                                            id="sidebar-view-default"
                                                            value={leftSidebarViewTypes.DEFAULT}
                                                            checked={leftSidebarViewType === leftSidebarViewTypes.DEFAULT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    dispatch(changeLeftsidebarViewType(e.target.value));
                                                                }
                                                            }}

                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-view-default">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Default</h5>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-style"
                                                            id="sidebar-view-detached"
                                                            value={leftSidebarViewTypes.DETACHED}
                                                            checked={leftSidebarViewType === leftSidebarViewTypes.DETACHED}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    dispatch(changeLeftsidebarViewType(e.target.value));
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-view-detached">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-flex p-1 gap-1 align-items-center px-2">
                                                                    <span className="d-block p-1 bg-soft-primary rounded me-1"></span>
                                                                    <span className="d-block p-1 pb-0 px-2 bg-soft-primary ms-auto"></span>
                                                                    <span className="d-block p-1 pb-0 px-2 bg-soft-primary"></span>
                                                                </span>
                                                                <span className="d-flex gap-1 h-100 p-1 px-2">
                                                                    <span className="flex-shrink-0">
                                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                            <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                                <span className="bg-light d-block p-1 mt-auto px-2"></span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Detached</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}

                                {layoutType !== "horizontal" && (
                                    <div id="sidebar-color">
                                        <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Color</h6>
                                        <p className="text-muted">Choose Ligth or Dark Sidebar Color.</p>

                                        <div className="row">
                                            <div className="col-4">
                                                <div className="form-check sidebar-setting card-radio">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="data-sidebar"
                                                        id="sidebar-color-light"
                                                        value={leftSidebarTypes.LIGHT}
                                                        checked={leftSidebarType === leftSidebarTypes.LIGHT}
                                                        onChange={e => {
                                                            if (e.target.checked) {
                                                                dispatch(changeSidebarTheme(e.target.value));
                                                            }
                                                        }}
                                                    />
                                                    <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-color-light">
                                                        <span className="d-flex gap-1 h-100">
                                                            <span className="flex-shrink-0">
                                                                <span className="bg-white border-end d-flex h-100 flex-column gap-1 p-1">
                                                                    <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                                </span>
                                                            </span>
                                                            <span className="flex-grow-1">
                                                                <span className="d-flex h-100 flex-column">
                                                                    <span className="bg-light d-block p-1"></span>
                                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </label>
                                                </div>
                                                <h5 className="fs-13 text-center mt-2">Light</h5>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-check sidebar-setting card-radio">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="data-sidebar"
                                                        id="sidebar-color-dark"
                                                        value={leftSidebarTypes.DARK}
                                                        checked={leftSidebarType === leftSidebarTypes.DARK}
                                                        onChange={e => {
                                                            if (e.target.checked) {
                                                                dispatch(changeSidebarTheme(e.target.value));
                                                            }
                                                        }}
                                                    />
                                                    <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-color-dark">
                                                        <span className="d-flex gap-1 h-100">
                                                            <span className="flex-shrink-0">
                                                                <span className="bg-primary d-flex h-100 flex-column gap-1 p-1">
                                                                    <span className="d-block p-1 px-2 bg-soft-light rounded mb-2"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                                </span>
                                                            </span>
                                                            <span className="flex-grow-1">
                                                                <span className="d-flex h-100 flex-column">
                                                                    <span className="bg-light d-block p-1"></span>
                                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </label>
                                                </div>
                                                <h5 className="fs-13 text-center mt-2">Dark</h5>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </SimpleBar>

                    </OffcanvasBody>
                    
                </Offcanvas>
            </div>
        </React.Fragment>
    );
};

export default RightSidebar;