export default function Form({
  extras,
  datatype,
  data,
  tech,
  onServiceChange,
  onExtraChange,
  onTechChange,
  selectedService,
}) {
  /*const eleniAllowedServices = [
    "Μανικιουρ με μανο",
    "Μανικιουρ με ημιμονιμο",
    "Μανικιουρ ",
    "Αφαιρεση ημιμονιμου",
    "Αφαιρεση υλικου",
    "Πεντικιουρ",
    "Πεντικιουρ με απλο μανο",
    "Πεντικιουρ με ημιμονιμο ",
    "Θεραπευτικο Πεντικιουρ απο:",
  ];
  const showEleni =
    selectedService && eleniAllowedServices.includes(selectedService.name);

  const filteredTechs = tech?.filter((t) => {
    if (showEleni) return true;
    return t.name !== "Eleni";
  });
  */
  return (
    <div>
      <form
        className="lg:h-auto py-10 px-16 text-lg sm:text-xl flex gap-5 flex-col text-primary-900 mr-5 sm:mr-0"
        encType="multipart/form-data"
      >
        <div className="space-y-4 space-x-4 ">
          <label>Select the type of service:</label>
          <select
            required
            className="px-5 py-3 bg-primary-50 text-primary-500 w-full md:w-1/2 lg:w-full shadow-sm rounded-md"
            onChange={(e) => {
              const service = JSON.parse(e.target.value); // Parse the service
              onServiceChange(service); // Call handler to update parent state
            }}
          >
            <option value="">Select the type of service...</option>
            {data?.map((service) => (
              <option
                className="notranslate"
                value={JSON.stringify(service)}
                key={service.name}
              >
                {service.name} , {service.price}€
              </option>
            ))}
          </select>
          {datatype == "mani" && (
            <p className="text-primary-800 font-thin text-sm">
              {" "}
              *Η επεκταση GEL κυμαινεται στα 30 με 45 ευρω αναλογα το μεγεθος{" "}
              <br /> *Η συντηρηση GEL κυμαινεται στα 25 με 35 ευρω αναλογα το
              μεγεθος
            </p>
          )}
        </div>
        {(datatype == "mani" || datatype == "pedi") && (
          <div className="space-y-4 space-x-4">
            <label>Extra (optional):</label>
            <select
              className="px-5 py-3 bg-primary-50 text-primary-500 w-full md:w-1/2 lg:w-full shadow-sm rounded-md"
              onChange={(e) => {
                const extras = JSON.parse(e.target.value); // Parse the service
                onExtraChange(extras); // Call handler to update parent state
              }}
            >
              <option value="">Select extra...</option>
              {extras?.map((extras) => (
                <option
                  className="notranslate"
                  value={JSON.stringify(extras)}
                  key={extras.name}
                >
                  {extras.name} , {extras.price}€
                </option>
              ))}
            </select>
            <p className="text-primary-800 font-thin">
              {" "}
              *Charms και 3D σχεδια: 1€ το καθενα
            </p>
          </div>
        )}

        <div className="space-y-4 space-x-4">
          <label>Select the technician:</label>
          <select
            required
            className="px-5 py-3 bg-primary-50 text-primary-500 w-full md:w-1/2 lg:w-full shadow-sm rounded-md"
            onChange={(e) => {
              const tech = JSON.parse(e.target.value);
              onTechChange(tech);
            }}
          >
            <option value="">Select a technician...</option>

            {tech?.map((tech) => (
              <option value={JSON.stringify(tech)} key={tech.name}>
                {tech.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
