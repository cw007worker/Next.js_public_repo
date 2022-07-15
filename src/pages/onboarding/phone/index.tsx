import { LayoutForAuth } from 'components/organisms/Layout/forAuth';
import { usePhonePage } from 'hooks/pages/onboarding/usePhonePage';
import { PhoneTemplate } from 'components/templates/Onboarding/Phone';
import { useOnboardingRoutingHandler } from 'hooks/pages/onboarding/useOnboardingRoutingHandler';
import React from 'react';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { VerifyPhoneCodeModal } from 'components/templates/VerifyPhoneCodeModal';

const Phone = () => {
  // useOnboardingRoutingHandler();
  const {
    registerNumber,
    verifyCode,
    isOpenVerifyCodeModal,
    onCloseVerifyCodeModal,
    phoneNumber,
  } = usePhonePage();

  return (
    <React.Fragment>
      <LayoutForAuth>
        <PhoneTemplate {...registerNumber} />
      </LayoutForAuth>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenVerifyCodeModal}
        onClose={onCloseVerifyCodeModal}
      >
        <ModalOverlay />
        <VerifyPhoneCodeModal
          state={verifyCode.state}
          onSubmit={verifyCode.onSubmit}
          isSubmitting={verifyCode.isSubmitting}
          canGo={verifyCode.canGo}
          errors={verifyCode.errors}
          register={verifyCode.register}
          control={verifyCode.control}
          handleSubmit={verifyCode.handleSubmit}
          onCloseVerifyCodeModal={onCloseVerifyCodeModal}
          phoneNumber={phoneNumber}
        />
      </Modal>
    </React.Fragment>
  );
};

export default Phone;
