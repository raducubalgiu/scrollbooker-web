type LandingSymbolProps = {
  height?: number;
};

// Marca "play" izolată (fără coada care o continuă spre forma de "3"/B) —
// varianta pentru locuri compacte, de sine stătătoare, per sistemul de
// brand: marca-3 completă e pentru context de tip iconiță de aplicație,
// "play" izolat e pentru locuri restrânse ca acesta (nav mobil). Sursa
// (ScrollBooker_simbol_play_alb.svg) are deja viewBox-ul strâns pe
// conținut, nu are nevoie de crop.
export default function LandingSymbol({ height = 28 }: LandingSymbolProps) {
  const width = height * (420.81 / 416.06);

  return (
    <svg
      width={width}
      height={height}
      viewBox="310.00 173.94 420.81 416.06"
      role="img"
      aria-label="ScrollBooker"
    >
      <path
        d="M352.00,500.00 L352.00,258.00 Q352.00,196.00 406.59,225.39 L661.41,362.61 Q716.00,392.00 661.84,422.18 L436.00,548.00"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={84}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
