export const COMPANY_PHONE = "9515661677";
export const COMPANY_PHONE_DISPLAY = "+91 9515661677";
export const COMPANY_WHATSAPP_LINK = "https://wa.me/919515661677?text=Hello%20Doorstep%20Repair%20Service,%20I%20would%20like%20to%20book%20a%20technician%20for%20my%20appliance.";
export const COMPANY_CALL_LINK = "tel:9515661677";

export const CITIES = [
  { id: "vijayawada", name: "Vijayawada", tag: "Popular", hub: "Benz Circle, MG Road, One Town, Gunadala" },
  { id: "guntur", name: "Guntur", tag: "Fast Response", hub: "Arundelpet, Brodipet, Pattabhipuram, Amaravathi Rd" },
  { id: "nellore", name: "Nellore", tag: "Verified Techs", hub: "Trunk Road, Magunta Layout, Balaji Nagar, Vedayapalem" }
];

export const SERVICE_CATEGORIES = [
  {
    id: "oven",
    name: "Oven Repair",
    title: "Oven & Microwave Repair Services",
    image: "/service_oven.jpg",
    shortDesc: "Expert repair for Convectional and Microwave Ovens with brand-genuine magnetrons, timers, and heating coils.",
    tag: "Same-Day Fix",
    subcategories: [
      {
        id: "convectional-oven",
        name: "Convectional Oven Repair",
        shortDesc: "Heating element restoration, fan circulation, temperature thermostat calibration, and baking coil replacement.",
        price: "From ₹299 Diagnostic Fee",
        badge: "Bake & Broil Expert",
        issues: ["Uneven baking / heating", "Blower fan not rotating", "Thermostat temperature variation", "Door glass & seal replacement"]
      },
      {
        id: "microwave-oven",
        name: "Microwave Oven Repair",
        shortDesc: "Precision magnetron replacement, high voltage diode fixes, spark suppression, turntable drive, and capacitive touch panel repair.",
        price: "From ₹299 Diagnostic Fee",
        badge: "Same-Day Fix",
        issues: ["Not heating food", "Sparking inside cavity", "Turntable plate not rotating", "Touchpad buttons unresponsive", "Display error codes"]
      }
    ]
  },
  {
    id: "geyser",
    name: "Geyser Repair",
    title: "Geyser & Water Heater Repair Services",
    image: "/service_geyser.jpg",
    shortDesc: "Fast hot water restoration and electric shock-hazard prevention for Electric & Instant Geysers.",
    tag: "60 Min Arrival",
    subcategories: [
      {
        id: "electric-geyser",
        name: "Electric Geyser Repair",
        shortDesc: "Heavy-duty copper heating coil change, auto-cutoff thermostat fix, tank descaling, internal wiring, and tank leakage seals.",
        price: "From ₹249 Diagnostic Fee",
        badge: "Heavy Duty Heating",
        issues: ["Water taking too long to heat", "Electric current / shock feeling", "Water dripping from tank base", "Thermostat tripping MCB"]
      },
      {
        id: "instant-geyser",
        name: "Instant Geyser Repair",
        shortDesc: "Rapid heating coil repair, pressure release safety valve replacement, thermal fuse fix, and inlet pipe leakage rectification.",
        price: "From ₹249 Diagnostic Fee",
        badge: "Express 60 Min",
        issues: ["Zero hot water flow", "Pressure release valve continuous dripping", "Indicator light not turning on", "Steam emitting from tap"]
      }
    ]
  },
  {
    id: "tv",
    name: "TV Repair",
    title: "LED, Smart & Android TV Repair Services",
    image: "/service_tv.jpg",
    shortDesc: "Precision panel diagnostics, backlight replacements, motherboard repair & wall mounting across leading brands.",
    tag: "Genuine Spares",
    subcategories: [
      {
        id: "lcd-tv",
        name: "LCD TV Repair",
        shortDesc: "Inverter board repair, CCFL backlight fixing, video processing card inspection, and power supply capacitor upgrades.",
        price: "From ₹349 Diagnostic Fee",
        badge: "Circuit Specialist",
        issues: ["Dim or flicking display", "Sound working but screen dark", "Power standby light blinking", "Horizontal or vertical lines"]
      },
      {
        id: "led-tv",
        name: "LED TV Repair",
        shortDesc: "OEM LED backlight strip replacement, display panel repair, power module fix, and HDMI/AV input board repair.",
        price: "From ₹349 Diagnostic Fee",
        badge: "Backlight Expert",
        issues: ["Dark screen with audio output", "White spots / blue tint on screen", "Half screen dark", "No power on unit"]
      },
      {
        id: "smart-android-tv",
        name: "Smart Android TV Repair",
        shortDesc: "Motherboard micro-soldering, Android OS firmware flash, boot-loop recovery, WiFi/Bluetooth module fix, and smart sound card repair.",
        price: "From ₹399 Diagnostic Fee",
        badge: "Smart OS & Hardware",
        issues: ["Stuck on Android / Google TV logo", "WiFi & Bluetooth disconnection", "Apps crashing or freezing", "Audio sync & HDMI ARC issue"]
      },
      {
        id: "tv-installation",
        name: "TV Installation / Wall Mounting",
        shortDesc: "Heavy-duty swivel / tilt / fixed bracket wall mounting, precision leveling, cable management, and home theater connectivity.",
        price: "From ₹299 Standard Mount",
        badge: "Professional Mount",
        issues: ["New TV installation on brick/wood wall", "Concealed wire routing", "Bracket replacement / uninstallation", "External speaker setup"]
      }
    ]
  },
  {
    id: "ac",
    name: "AC Service & Repair",
    title: "Air Conditioner Installation & Repair Services",
    image: "/service_ac.jpg",
    shortDesc: "High-pressure jet cleaning, eco gas charging, split and cassette AC installation & troubleshooting.",
    tag: "Jet Wash Available",
    subcategories: [
      {
        id: "ac-installation",
        name: "AC Installation Service",
        shortDesc: "Complete indoor & outdoor unit installation, copper line vacuuming, bracket mounting, vibration dampers, and test cooling check.",
        price: "From ₹499 Standard Install",
        badge: "Certified Install",
        issues: ["New Split AC installation", "AC uninstallation / relocation", "Copper pipe insulation & extension", "Drain hose setup"]
      },
      {
        id: "cassette-ac",
        name: "Cassette AC Repair",
        shortDesc: "Commercial & luxury residential ceiling cassette AC inspection, lift pump clearing, multi-zone thermostat calibration, and refrigerant refill.",
        price: "From ₹599 Inspection Fee",
        badge: "Commercial & Premium",
        issues: ["Ceiling water dripping from grille", "Error codes on digital controller", "Low air circulation in room", "Compressor continuous tripping"]
      },
      {
        id: "split-ac",
        name: "Split AC Repair",
        shortDesc: "Deep foam jet wet wash, cooling coil leak sealing, R32 / R410A gas refill, inverter motherboard PCB repair, and fan motor replacement.",
        price: "From ₹399 Jet Wash / Diagnostic",
        badge: "Top Requested",
        issues: ["Not cooling / blowing warm air", "Water leaking inside the room", "Foul odor from vents", "Ice formation on indoor coil", "Outdoor unit loud noise"]
      }
    ]
  },
  {
    id: "washing-machine",
    name: "Washing Machine Repair",
    title: "Washing Machine Diagnostics & Repair",
    image: "/service_washing_machine.jpg",
    shortDesc: "Certified technician solutions for Front Load and Top Load automatic washing machines.",
    tag: "90 Days Warranty",
    subcategories: [
      {
        id: "front-load-wm",
        name: "Front Load Washing Machine Repair",
        shortDesc: "Drum spider & bearing replacement, rubber door boot gasket seal change, drain pump unclogging, motor carbon brushes, and PCB board fix.",
        price: "From ₹399 Diagnostic Fee",
        badge: "Front Load Specialist",
        issues: ["Drum not rotating / stuck", "Excessive noise and vibration during spin", "Water not draining out", "Door lock error / won't open", "Detergent dispenser overflow"]
      },
      {
        id: "top-load-wm",
        name: "Top Load Washing Machine Repair",
        shortDesc: "Pulsator & agitator replacement, suspension rod calibration to eliminate banging, water inlet solenoid valve change, and gear box repair.",
        price: "From ₹349 Diagnostic Fee",
        badge: "Top Load Expert",
        issues: ["Machine shaking violently during spin", "Water continuously filling without stopping", "Pulsator not turning clothes", "Drain valve choked", "Cycle stops halfway"]
      }
    ]
  },
  {
    id: "refrigerator",
    name: "Refrigerator Repair",
    title: "Refrigerator Diagnostics & Gas Refill Services",
    image: "/service_fridge.jpg",
    shortDesc: "Single Door, Double Door & Side-by-Side refrigerator gas charging, compressor, and cooling fixes.",
    tag: "Doorstep Gas Refill",
    subcategories: [
      {
        id: "single-door-fridge",
        name: "Single Door Fridge Repair",
        shortDesc: "Direct-cool thermostat replacement, freezer evaporator puncture patch & gas refill, relay & overload protector, and door gasket sealing.",
        price: "From ₹299 Diagnostic Fee",
        badge: "Direct Cool Expert",
        issues: ["Freezer ice melting / low cooling", "Compressor not starting / clicking sound", "Gas leakage from freezer coil", "Excessive ice frost build-up"]
      },
      {
        id: "double-door-refrigerator",
        name: "Double Door Refrigerator Repair",
        shortDesc: "Frost-free defrost timer, bimetal sensor and heater replacement, evaporator circulation fan motor, and capillary tube flushing with refrigerant.",
        price: "From ₹399 Diagnostic Fee",
        badge: "Frost Free Specialist",
        issues: ["Freezer cold but bottom fridge warm", "Water accumulating in vegetable tray", "Defrost system failure", "Continuous compressor humming"]
      },
      {
        id: "side-by-side-refrigerator",
        name: "Side by Side Door Refrigerator Repair",
        shortDesc: "Inverter linear compressor diagnostic, dual cooling zone thermostat calibration, electronic motherboard PCB fix, and water dispenser/ice maker repair.",
        price: "From ₹499 Diagnostic Fee",
        badge: "Multi-Door / Luxury",
        issues: ["Dual zone cooling imbalance", "Ice maker not dispensing", "Digital display error code", "Inverter PCB failure", "Internal condensation"]
      }
    ]
  }
];

export const SERVICES = [
  {
    id: "oven",
    name: "Oven & Microwave Repair",
    shortName: "Oven",
    icon: "Flame",
    badge: "Same-Day Fix",
    description: "Expert repair for Solo, Grill & Convection microwave ovens, heating coil replacement, touch panel fix, magnetron repair.",
    pricing: "From ₹299 Inspection fee (adjusted in final bill)",
    issues: ["Not heating", "Sparking inside", "Turntable not rotating", "Keypad touch not working", "Auto turn-off / tripping"]
  },
  {
    id: "refrigerator",
    name: "Refrigerator Repair",
    shortName: "Refrigerator",
    icon: "Snowflake",
    badge: "90 Days Warranty",
    description: "Doorstep solutions for Single Door, Double Door, Side-by-Side & Frost-Free refrigerators. Gas charging and compressor replacement.",
    pricing: "From ₹299 Diagnostic fee",
    issues: ["No cooling / weak cooling", "Water leaking at bottom", "Compressor continuous noise", "Freezer ice build-up", "Gas leak & refill"]
  },
  {
    id: "washing-machine",
    name: "Washing Machine Repair",
    shortName: "Washing Machine",
    icon: "RotateCcw",
    badge: "Top Rated",
    description: "Prompt diagnosis and repairs for Front Load, Top Load, and Semi-Automatic machines across all leading brands.",
    pricing: "From ₹299 Diagnostic fee",
    issues: ["Drum not spinning", "Water draining issue", "Vibration / abnormal sound", "Door lock error", "PCB motherboard error codes"]
  },
  {
    id: "tv",
    name: "LED & Smart TV Repair",
    shortName: "TV",
    icon: "Tv",
    badge: "Genuine Spares",
    description: "Precise panel diagnosis, backlight LED strip replacement, motherboard repair, sound problem rectification for OLED/QLED/LED 4K TVs.",
    pricing: "From ₹349 Diagnostic fee",
    issues: ["Sound OK but screen black", "Horizontal / vertical lines", "No power / standby red light", "HDMI / WiFi connectivity", "Broken panel replacement"]
  },
  {
    id: "geyser",
    name: "Geyser & Water Heater Repair",
    shortName: "Geyser",
    icon: "Droplets",
    badge: "Quick 60 Min Service",
    description: "Instant & storage geysers inspection, copper coil de-scaling, thermostat replacement, shock-hazard prevention, tank leakage repairs.",
    pricing: "From ₹249 Diagnostic fee",
    issues: ["Water not heating up", "Electric trip / shock sensation", "Water dripping from tank", "Overheating steam issue", "Low hot water flow"]
  },
  {
    id: "ac",
    name: "Air Conditioner (AC) Service & Repair",
    shortName: "AC",
    icon: "Wind",
    badge: "Jet Wash Available",
    description: "Deep foam-jet cleaning, cooling coil leak repair, eco gas charging (R32/R410A), PCB fix, installation & uninstallation.",
    pricing: "From ₹399 Jet servicing",
    issues: ["No cooling / low airflow", "Water leakage inside room", "Foul smell from vents", "Compressor tripping breaker", "Remote not responding"]
  }
];

export const FAQS = [
  {
    q: "How fast can a technician arrive at my doorstep in Vijayawada, Guntur, or Nellore?",
    a: "Our technicians typically reach your doorstep within 60 to 90 minutes of booking confirmation. You can also pick a convenient same-day or future time slot."
  },
  {
    q: "Are the spare parts original and covered under warranty?",
    a: "Yes! We only use 100% brand-certified, high-grade replacement parts. All part replacements come with a 30 to 90-day doorstep warranty."
  },
  {
    q: "What is your visiting / inspection fee structure?",
    a: "A nominal diagnostic fee (starting at ₹249-₹299) applies for detailed troubleshooting. If you approve the repair estimate, the visiting charge is adjusted in the overall repair bill."
  },
  {
    q: "Can I book service directly over phone call or WhatsApp?",
    a: "Absolutely! You can call or WhatsApp our official support desk at 9515661677 anytime between 8:00 AM and 9:00 PM every day."
  },
  {
    q: "Will I get an automated confirmation email after submitting the booking?",
    a: "Yes! As soon as you enter your details and submit the Book Service form, our backend system immediately sends a comprehensive summary email with your booking ID and service details."
  }
];
