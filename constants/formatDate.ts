export const formatDate = (date: Date) => {
  const str = date?.toString().split('T')[0].replace(/-/g,"/");
  const obj = {
    year: str?.slice(0,4),
    month: str?.slice(5,7),
    day: str?.slice(8,10)
  }
  return obj.day + "/" + obj.month + "/" + obj.year;
}

export const timeLeft = (date?: Date) => {
  if (date === undefined) return;

  const now = new Date().getTime();

    const endTime = new Date(date).getTime();

    if (now > endTime) return "Finished !";

    const distance = endTime - now;


    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days >= 0) {
      return days + "d " + hours + "h " + minutes + "m ";
    }
    
    return  hours + "h " + minutes + "m " + seconds + "s ";
}