import { Row, Col, Upload, Button, Icon, Form, Divider, Radio } from "antd";
import { useEffect, useState } from 'react';
import styles from '../../style.less';
import { connect } from 'dva';
import { colorPickers, palettes, defaultPermissions } from '../../constant';
import { SketchPicker } from 'react-color'


let previewWindow = null;
class UiAndTheme extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fileList1: [],
            uploadingImage: [],
            member_portal_theme_colors: {},
            member_portal_palette_id: 0
        }
    }

    imageUploadTypes = "image/png, image/jpeg, image/jpg, image/bmp, image/gif";
    imgProps = {
        name: "store_logo",
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        accept: this.imageUploadTypes,
        onChange: ({ file, fileList }) => {
            this.setState({ fileList1: ([fileList[fileList.length - 1]]) })
            if (file.status == 'uploading') {
                this.setState({ uploadingImage: true })
            } else if (file.status == 'error') {
                this.setState({ uploadingImage: false })

                // message.error(fileList[0].response.message);
            } else {
                this.setState({ uploadingImage: false })

            }
        }
    }
    openPreview = () => {
          previewWindow = window.open(`${window.location.origin}/preview/new`, "_blank");
      }


    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/getPaletteColors',
            payload: {},
        })
    }
    handleSwatchClick = (stateName) => {
        this.setState({ [stateName]: !this.state[stateName] })
    }

    handlePickerClose = (stateName) => {
        this.setState({ [stateName]: !this.state[stateName] })
    };

    updateThemeState = (stateName, color) => {
        let localColor = JSON.parse(localStorage.getItem('theme-color'));
        localStorage.setItem("theme-color", JSON.stringify({ ...localColor, [stateName]: color.hex }))
        this.setState({ member_portal_theme_colors: { ...this.state.member_portal_theme_colors, [stateName]: color.hex } });
        if (previewWindow !== null && previewWindow.parent !== null)
          previewWindow.location.reload(true);
      }
    
      handlePrimaryPickerChange = (color) => {
        this.updateThemeState("primaryColor", color);
      };
    
      handleSecondaryPickerChange = (color) => {
        this.updateThemeState("secondaryColor", color);
      };
    
      handleTextPickerChange = (color) => {
        this.updateThemeState("textColor", color);
      };
    
      handleTextSecondaryPickerChange = (color) => {
        this.updateThemeState("textSecondaryColor", color);
      }
    
      handleHeadingPickerChange = (color) => {
        this.updateThemeState("headingColor", color);
      }
    
      handleHeaderBgPickerChange = (color) => {
        this.updateThemeState("layoutHeaderBg", color);
      }
    
      handlePageHeaderPickerChange = (color) => {
        this.updateThemeState("pageHeaderBg", color);
      }
    
      handleSiderBgPickerChange = (color) => {
        this.updateThemeState("layoutSiderBg", color);
      }
    
      handleButtonPickerChange = (color) => {
        this.updateThemeState("btnPrimaryColor", color);
      }
    
      handleProcessingPickerChange = (color) => {
        this.updateThemeState("processingColor", color);
      }
    
      handleSiderBgPickerChange = (color) => {
        this.updateThemeState("layoutSiderBg", color);
      }
    
      handleButtonPickerChange = (color) => {
        this.updateThemeState("btnPrimaryColor", color);
      }
    
      handleProcessingPickerChange = (color) => {
        this.updateThemeState("processingColor", color);
      }


    handlePaletteChange = (e) => {
        debugger
        let selectedPalette = { ...palettes[e.target.value] };
        delete selectedPalette.label;
        localStorage.setItem("theme-color", JSON.stringify({ ...selectedPalette }))
        this.setState({ member_portal_theme_colors: { ...selectedPalette }, member_portal_palette_id: e.target.value });
        if (previewWindow !== null && previewWindow.parent !== null)
        previewWindow.location.reload(true);
    }

    render() {
        const {
            form: { getFieldDecorator }
        } = this.props.props.props;

        return (
            <>
                <Row gutter={24}>
                    <Col lg={8} md={12} sm={24}>
                        <Form.Item
                            label="Store logo"
                            extra="The logo of your store, shows on the header of the membership page"
                        >
                            {getFieldDecorator(
                                'member_portal_logo', {
                            }
                            )(<Upload {...this.imgProps} fileList={this.state.fileList1}>
                                <Button loading={this.state.uploadingImage}>
                                    <Icon type="upload" /> Upload logo
                        </Button>
                            </Upload>)
                            }
                        </Form.Item>
                    </Col>
                </Row>

                <Divider orientation="left">Color palette options</Divider>
                <Row gutter={24} style={{ marginLeft: "1px" }}>
                    <Form.Item
                        label=""
                        extra=""
                    >
                        {getFieldDecorator(
                            'member_portal_palette_id', {
                            initialValue:
                                //    this.state.updateForm ?
                                //     portalDetails && portalDetails.member_portal_palette_id !== '' ? portalDetails.member_portal_palette_id : 0
                                //     :
                                0,
                        }
                        )(<Radio.Group name="actionsgroup"
                            size="large"
                            onChange={this.handlePaletteChange}>
                            {this.props.palettes.map((palette, index) => {
                                return (
                                    <Radio value={index}
                                        className={styles.paletteRadioGroup}>
                                        <span className={styles.paletteLabel}>{palette.label}</span>
                                        <div className={styles.paletteFrame}>
                                            <div className={styles.paletteColor} style={{ backgroundColor: palette.primaryColor }}></div>
                                            <div className={styles.paletteColor} style={{ backgroundColor: palette.layoutHeaderBg }}></div>
                                            <div className={styles.paletteColor} style={{ backgroundColor: palette.pageHeaderBg }}></div>
                                            <div className={styles.paletteColor} style={{ backgroundColor: palette.textColor }}></div>
                                            <div className={styles.paletteColor} style={{ backgroundColor: palette.btnPrimaryColor }}></div>
                                        </div>
                                    </Radio>
                                )
                            })}
                        </Radio.Group>)}
                    </Form.Item>
                </Row>

                <Row gutter={24}>
                      {colorPickers.map((picker) => {
                        return (<Col lg={8} md={12} sm={24}>
                          <Form.Item
                            label={picker.label}
                            extra={<span style={{ textTransform: "uppercase", fontWeight: 500 }}>{(this.state.member_portal_theme_colors && this.state.member_portal_theme_colors.hasOwnProperty(picker.themeKey)) ? this.state.member_portal_theme_colors[picker.themeKey] : palettes[0][picker.themeKey]} </span>}
                          >
                            {getFieldDecorator(
                              picker.itemName, {
                              initialValue: (this.state.member_portal_theme_colors && this.state.member_portal_theme_colors.hasOwnProperty(picker.themeKey)) ? this.state.member_portal_theme_colors[picker.themeKey] : palettes[0][picker.themeKey],
                            }
                            )(
                              <div>
                                <div className={styles.swatch} onClick={() => this[picker.swatchClickHandler](picker.swatchState)}>
                                  <div className={styles.color}
                                    style={{ background: (this.state.member_portal_theme_colors && this.state.member_portal_theme_colors.hasOwnProperty(picker.themeKey)) ? this.state.member_portal_theme_colors[picker.themeKey] : palettes[0][picker.themeKey] }} /></div>
                                {this.state[picker.swatchState] ?
                                  <div appendTo="body" className={styles.popover}>
                                    <div className={styles.cover} onClick={() => this[picker.pickerCloseHandler](picker.swatchState)} />
                                    <SketchPicker className={styles.picker} color={(this.state.member_portal_theme_colors && this.state.member_portal_theme_colors.hasOwnProperty(picker.themeKey)) ? this.state.member_portal_theme_colors[picker.themeKey] : palettes[0][picker.themeKey]} onChange={this[picker.colorChangeHandler]} />
                                  </div> :
                                  null}
                              </div>
                            )
                            }
                          </Form.Item>
                        </Col>)
                      })}
                </Row>

                <span style={{ float: 'right' }}>
                    <Button type="primary" onClick={this.openPreview} ghost>Theme preview</Button>
                </span>
            </>
        )
    }
}
export default connect(({ user }) => ({
    palettes: user.palettes
}))(UiAndTheme);