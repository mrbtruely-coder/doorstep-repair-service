export const COMPANY_PHONE = "9515661677";
export const COMPANY_PHONE_DISPLAY = "+91 9515661677";
export const COMPANY_WHATSAPP_LINK = "https://wa.me/919515661677?text=Hello%20Doorstep%20Repair%20Service,%20I%20would%20like%20to%20book%20a%20technician%20for%20my%20appliance.";
export const COMPANY_CALL_LINK = "tel:9515661677";

export const CITIES = [
  { id: "vijayawada", name: "Vijayawada", tag: "Popular", hub: "Benz Circle, MG Road, One Town, Gunadala" },
  { id: "guntur", name: "Guntur", tag: "Fast Response", hub: "Arundelpet, Brodipet, Pattabhipuram, Amaravathi Rd" },
  { id: "nellore", name: "Nellore", tag: "Verified Techs", hub: "Trunk Road, Magunta Layout, Balaji Nagar, Vedayapalem" }
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
