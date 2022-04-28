import { useEffect, useState } from "react";

const useServicesDetails = (serviceId) => {
  const [service, setService] = useState([]);

  useEffect(() => {
    const url = `https://arcane-springs-59725.herokuapp.com/service/${serviceId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [serviceId]);
  return [service, setService];
};

export default useServicesDetails;
