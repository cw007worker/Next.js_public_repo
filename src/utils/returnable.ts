const THE_RETURNABLE_DAYS = 30;

export const isReturnable = (shipmentDate: Date): boolean => {
  const nowDate = new Date();
  const diffMSec = nowDate.getTime() - shipmentDate.getTime();
  const diffSec = Math.floor(diffMSec / 1000);
  const day = Math.floor(diffSec / (24 * 60 * 60));
  return day <= THE_RETURNABLE_DAYS;
};
