# Paleta de culori ScrollBooker

Toate culorile aplicației web vin din `theme/theme.ts`, prin `theme.palette`.
Nicio componentă nu definește culori proprii, inclusiv landing-ul și
`/for-business`. Dacă ai nevoie de o culoare care nu există, o adaugi întâi în
temă, în ambele variante (light și dark), și abia apoi o folosești.

## Cum se folosesc

În `sx`, prin numele token-ului:

```tsx
<Box sx={{ bgcolor: "background.default", color: "text.primary" }} />
<Button color="neutral">Renunță</Button>
```

În gradiente, umbre sau oriunde ai nevoie de valoarea propriu-zisă, prin
`useTheme()`:

```tsx
const { palette } = useTheme();

background: `linear-gradient(90deg, ${palette.primary.main}, ${palette.secondary.main})`;
boxShadow: `0 12px 32px -10px ${alpha(palette.secondary.main, 0.6)}`;
```

Pentru transparență se folosește `alpha()` din `@mui/material`, nu sufixe hex
lipite de culoare.

## Culorile de brand

| Token | Light | Dark | Rol |
|---|---|---|---|
| `primary.main` | `#FF6F00` | `#FF6F00` | Portocaliul ScrollBooker. CTA-uri principale, logo, stări active. |
| `primary.dark` | `#E06400` | `#E06400` | Hover pe butoanele portocalii. |
| `primary.light` | `rgb(255, 139, 51)` | `rgb(255, 139, 51)` | Calculat automat de MUI. |
| `primary[100]` | `#FF8F00` | `#FF8F00` | Portocaliu deschis, pentru accente. |
| `primary[200]` | `#F0B90B` | nedefinit | Doar în tema light. |
| `secondary.main` | `#FF2E7E` | `#FF2E7E` | Rozul ScrollBooker, semnătura brandului. |
| `secondary.light` | `rgb(255, 87, 151)` | `rgb(255, 87, 151)` | Calculat automat de MUI. |
| `secondary.dark` | `rgb(178, 32, 88)` | `rgb(178, 32, 88)` | Calculat automat de MUI. |

Butoanele `contained` portocalii au text alb, setat explicit în tema
(`MuiButton.containedPrimary`).

### Unde apare rozul

Rozul se folosește puțin, ca semnătură, nu ca a doua culoare principală:

- gradientul portocaliu → roz de pe CTA-urile din hero și de pe cuvântul
  evidențiat din titluri;
- buline și badge-uri mici, accente pe iconițe;
- glow-ul secundar din fundal, mai mic decât cel portocaliu;
- un singur bloc mare cu gradient, CTA-ul de final de pe landing.

Nu se folosește pe suprafețe mari, pe text lung sau pe etichete de categorie.

## Neutrele

| Token | Light | Dark | Rol |
|---|---|---|---|
| `background.default` | `#FFFFFF` | `#000000` | Fundalul paginilor. |
| `background.paper` | `#F1F1F1` | `#262626` | Carduri, meniuri, modale, AppBar-ul din setări. |
| `surface.main` | `#F6F6F7` | `#0A0A0A` | Cardurile de pe landing și `/for-business`, puțin ridicate față de fundal. |
| `neutral.main` | `#F1F1F1` | `#1C1C1C` | Butoanele secundare gri (`color="neutral"`) și fundalul input-urilor. |
| `neutral.light` | `rgb(243, 243, 243)` | `rgb(73, 73, 73)` | Calculat automat de MUI. |
| `neutral.dark` | `rgb(168, 168, 168)` | `rgb(19, 19, 19)` | Calculat automat de MUI. Hover pe butoanele gri. |
| `neutral[100]` | nedefinit | `#364045` | Doar în tema dark. |
| `neutral[200]` | nedefinit | `#FFFDF9` | Doar în tema dark. |
| `divider` | `rgba(0, 0, 0, 0.12)` | `#2E2E2E` | Borduri și separatoare. |

`neutral` a fost înainte slotul `secondary`. A fost mutat ca `secondary` să
poată fi rozul de brand, deci nu se mai folosește `color="secondary"` pentru
butoanele gri.

## Text

| Token | Light | Dark |
|---|---|---|
| `text.primary` | `rgba(0, 0, 0, 0.87)` | `#FFFFFF` |
| `text.secondary` | `rgba(0, 0, 0, 0.6)` | `rgba(255, 255, 255, 0.7)` |
| `text.disabled` | `rgba(0, 0, 0, 0.38)` | `rgba(255, 255, 255, 0.5)` |
| `common.white` | `#FFFFFF` | `#FFFFFF` |
| `common.black` | `#000000` | `#000000` |

`common.white` se folosește pentru text peste portocaliu, roz sau gradient,
indiferent de temă.

## Culori semantice și de categorie

Au un singur înțeles fiecare. Nu se folosesc ca accente de brand.

| Token | Light | Dark | Înțeles |
|---|---|---|---|
| `rating.main` | `#FAAF00` | `#FAAF00` | Stele și note. |
| `whatsapp.main` | `#25D366` | `#25D366` | Contact pe WhatsApp. |
| `whatsapp.dark` | `#1DA851` | `#1DA851` | Varianta pentru text și iconițe pe fundal deschis. |
| `lastMinute.main` | `#06B0CA` | `#06B0CA` | Oferte last minute. |
| `beauty.main` | `#7A2E3A` | `#9B4A55` | Categoria Beauty. |
| `medical.main` | `#36CFC9` | `#5EDAD5` | Categoria Medical. |
| `auto.main` | `#3A86FF` | `#6FA8FF` | Categoria Auto. |

## Stări

Valorile implicite MUI, nemodificate în temă.

| Token | Light | Dark |
|---|---|---|
| `error.main` | `#D32F2F` | `#F44336` |
| `warning.main` | `#ED6C02` | `#FFA726` |
| `success.main` | `#2E7D32` | `#66BB6A` |
| `info.main` | `#0288D1` | `#29B6F6` |
| `action.disabled` | `rgba(0, 0, 0, 0.26)` | `rgba(255, 255, 255, 0.3)` |
| `action.disabledBackground` | `rgba(0, 0, 0, 0.12)` | `rgba(255, 255, 255, 0.12)` |

Butoanele dezactivate sau în loading folosesc aceste valori. Gradientul de
brand se aplică doar butoanelor active (vezi `AuthGradientButton`).

## Componente care aplică paleta

- `BrandGlow`: cele două glow-uri din fundal, portocaliu și roz.
- `BrandHeader`: header-ul lipit sus, cu blur, folosit în auth și onboarding.
- `AuthGradientButton`: butonul pill cu gradient portocaliu → roz.
- `AuthHeading`: titlurile mari și badge-ul cu bulină roz.

Landing-ul și `/for-business` citesc direct `theme.palette`. Pagina
`/for-business` e forțată pe light prin `LandingForcedTheme`.

## Mobil

Android (`ui/theme/Color.kt`) și iOS (`Core/DesignSystem/Theme/Colors.swift`)
au propriile token-uri, definite separat. Nu au fost încă verificate față de
această paletă, iar rozul de brand ca `secondary` e o decizie luată pe web.
Orice schimbare de aici trebuie verificată și acolo.
