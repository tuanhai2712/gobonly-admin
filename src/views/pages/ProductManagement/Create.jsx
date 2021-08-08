import React, { Fragment, useState, useEffect } from 'react';
import { Tabs } from 'antd';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
const { TabPane } = Tabs;
const STEP_ONE = 1;
const STEP_TWO = 2;
const STEP_THREE = 3;
export default function Create() {
  useEffect(() => {
    document.title = 'Tạo dữ liệu';
    window.scrollTo(0, 0);
  }, []);

  const [templates, setTemplates] = useState([]);
  const [step, setStep] = useState(STEP_ONE);
  const callback = (key) => {
    setStep(parseInt(key));
  };

  const selectTemplates = (data) => {
    setTemplates((prevArray) => [...prevArray, data]);
  };
  const unCheckTemplateSelected = (data) => {
    const arr = templates;
    const findItemUncheck = arr.findIndex(
      (itemSelected) => itemSelected.id === data.id
    );
    arr.splice(findItemUncheck, 1);
    setTemplates(() => [...arr]);
  };
  const nextStep = (currentStep) => {
    setStep(currentStep + 1);
  };
  return (
    <Fragment>
      <Tabs activeKey={String(step)} onChange={callback} type="card">
        <TabPane tab="Chọn Danh Mục" key={String(STEP_ONE)}>
          <StepOne
            selectTemplates={(data) => selectTemplates(data)}
            unCheckTemplateSelected={(data) => unCheckTemplateSelected(data)}
            templates={templates}
            nextStep={(currentStep) => nextStep(currentStep)}
            step={step}
          />
        </TabPane>
        <TabPane tab="Tạo sản phẩm" key={String(STEP_TWO)}>
          <StepTwo templates={templates} />
        </TabPane>
        <TabPane tab="Lưu sản phẩm" key={String(STEP_THREE)}>
          <StepThree />
        </TabPane>
      </Tabs>
    </Fragment>
  );
}
