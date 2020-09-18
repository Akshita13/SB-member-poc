import { Steps } from 'antd';
import { connect } from 'dva';
import GeneralSettingsForm from './forms/GeneralSettingForm';
import SupportContentForm from './forms/SupportContentForm';
import style from '../style.less'
const StepsComp = (props) => {
    const { Step } = Steps;
    const [currentStep, setcurrentStep] = React.useState(1);

    const changeStep = (value) => {
        setcurrentStep(value)
    }
    return (
        <>
            <p>Follow steps below to create/update membership.</p>
            <Steps size="small" current={currentStep}>
                <Step className='link' status={currentStep == 1 ? 'finish' : 'wait'}
                    onClick={() => { changeStep(1) }} key="1"
                    title="General Settings" description="Let's start with general settings your memership portal"
                ></Step>
                <Step className='link' status={currentStep == 2 ? 'finish' : 'wait'}
                    onClick={() => { changeStep(2) }} key="2"
                    title="Support content" description="Configure Talk to us section content"
                ></Step>
                <Step className='link' status={currentStep == 3 ? 'finish' : 'wait'}
                    onClick={() => { changeStep(3) }} key="3"
                    title="Addons" description="Enable/Disable permissions for your memership portal"
                ></Step>
                <Step className='link' status={currentStep == 4 ? 'finish' : 'wait'}
                    onClick={() => { changeStep(4) }} key="4"
                    title="UI & Theming" description="Configure store and theme for your memership portal"
                ></Step>
            </Steps>
            <div style={{ paddingLeft: '8px', paddingTop: '20px' }}>
                <div style={{display: currentStep==1 ? 'block' : 'none' }}>
                    <GeneralSettingsForm props={props} />
                </div>
                <div style={{display: currentStep==2 ? 'block' : 'none' }}>
                    <SupportContentForm props={props} />
                </div>
            </div>
        </>
    )
}

export default connect(({ }) => ({

}))(StepsComp)