
export const convertTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

export const convertTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };


export const contactInfo={
  address:"123 Anywhere St., Any City 12345",
  phone:"123-456-7890",
  email:"eskino@gmail.com"
}
