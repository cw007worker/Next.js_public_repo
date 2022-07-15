import ChannelService from 'libs/channel_talk/channel_service';
import { useEffect } from 'react';
import { CHANNELTALK_SDK_KEY } from 'libs/channel_talk/config';
import { useUserContext } from 'context/userContext';
import {
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';

export const useChannelTalk = () => {
  const state = useUserContext();

  useEffect(() => {
    // cssクラス名が.channel-talk-inqurery-buttonのボタンを押下した時に、channel tolkが開くようにする
    // FYI: https://guide-jp.channel.io/d57ab605-5d2c-4969-8da9-0f2989d2ad47
    ChannelService.boot({
      pluginKey: CHANNELTALK_SDK_KEY,
      customLauncherSelector: '.channel-talk-inqurery-button',
    });
  }, [ChannelService]);

  // channel talk の初期化
  useEffect(() => {
    if (isLoadingState(state)) return;
    if (isInitState(state)) return;

    let channelSettings;
    if (isSuccessState(state)) {
      channelSettings = {
        pluginKey: CHANNELTALK_SDK_KEY,
        profile: {
          name: `${state.data.lastName} ${state.data.firstName}`,
          memberId: state.data.id,
          mobileNumber: state.data.phoneNumber,
          email: state.data.email,
          is_membership: state.data.isMembership,
        },
      };
    } else {
      channelSettings = {
        pluginKey: CHANNELTALK_SDK_KEY,
      };
    }
    ChannelService.boot(channelSettings);
  }, [state]);
};
