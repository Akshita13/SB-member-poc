import { Row, Col, Upload, Button, Icon, Form,Divider,Radio} from "antd";
import { useEffect, useState } from 'react';
import styles from '../../style.less';
import { connect } from 'dva';
import { colorPickers, palettes, defaultPermissions } from '../../constant';
import {SketchPicker} from 'react-color'
const UiAndTheme = (props) => {
    const {
        form: { getFieldDecorator }
    } = props.props.props;
    const [fileList1, setFileList] = useState([]);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [member_portal_theme_colors,setmember_portal_theme_colors]=useState({})
    const [member_portal_palette_id,setmember_portal_palette_id]=useState(0)
    const [stateName,setStateName]=useState(false)


    const imageUploadTypes = "image/png, image/jpeg, image/jpg, image/bmp, image/gif";
    const imgProps = {
        name: "store_logo",
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        accept: imageUploadTypes,
        onChange: ({ file, fileList }) => {
            setFileList([fileList[fileList.length - 1]])
            if (file.status == 'uploading') {
                setUploadingImage(true);
            } else if (file.status == 'error') {
                setUploadingImage(false);
                // message.error(fileList[0].response.message);
            } else {
                setUploadingImage(false);
            }
        }
    }

    useEffect(()=>{
        const {dispatch}=props;
        dispatch({
            type: 'user/getPaletteColors',
            payload: {},
          })
    },[1])

   const handleSwatchClick = (stateName) => {
        debugger
        // this.setState({ [stateName]: !this.state[stateName] })
        setStateName(!stateName)
      }
    
    const handlePickerClose = (stateName) => {
        debugger
        // this.setState({ [stateName]: !this.state[stateName] })
        setStateName(!stateName)

      };
    

    const handlePaletteChange=(e)=>{
        let selectedPalette = { ...palettes[e.target.value] };
        delete selectedPalette.label;
        localStorage.setItem("theme-color", JSON.stringify({ ...selectedPalette }))
        setmember_portal_theme_colors({ ...selectedPalette })
        setmember_portal_palette_id(e.target.value)
    }
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
                    )(<Upload {...imgProps} fileList={fileList1}>
                        <Button loading={uploadingImage}>
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
              onChange={handlePaletteChange}>
              {props.palettes.map((palette, index) => {
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
                            extra={<span style={{ textTransform: "uppercase", fontWeight: 500 }}>{(member_portal_theme_colors && member_portal_theme_colors.hasOwnProperty(picker.themeKey)) ? member_portal_theme_colors[picker.themeKey] : palettes[0][picker.themeKey]} </span>}
                          >
                            {getFieldDecorator(
                              picker.itemName, {
                              initialValue: (member_portal_theme_colors && member_portal_theme_colors.hasOwnProperty(picker.themeKey)) ? member_portal_theme_colors[picker.themeKey] : palettes[0][picker.themeKey],
                            }
                            )(
                              <div>
                                <div className={styles.swatch} onClick={() => handleSwatchClick(picker.swatchState)}>
                                  <div className={styles.color}
                                    style={{ background: (member_portal_theme_colors && member_portal_theme_colors.hasOwnProperty(picker.themeKey)) ? member_portal_theme_colors[picker.themeKey] : palettes[0][picker.themeKey] }} /></div>
                                {[picker.swatchState] ?
                                  <div appendTo="body" className={styles.popover}>
                                    <div className={styles.cover} onClick={() => handlePickerClose(picker.swatchState)} />
                                    <SketchPicker className={styles.picker} color={(member_portal_theme_colors && member_portal_theme_colors.hasOwnProperty(picker.themeKey)) ? member_portal_theme_colors[picker.themeKey] : palettes[0][picker.themeKey]} onChange={[picker.colorChangeHandler]} />
                                  </div> :
                                  null}
                              </div>
                            )
                            }
                          </Form.Item>
                        </Col>)
                      })}
        </Row>
        </>
    )

}
export default connect(({user}) => ({
    palettes: user.palettes
}))(UiAndTheme);