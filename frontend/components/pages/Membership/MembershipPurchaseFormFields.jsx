"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, Mail, ShieldCheck, Smartphone, Upload } from "lucide-react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
const GOOGLE_PLACES_SCRIPT_ID = "ohc-google-places-script";
let googlePlacesScriptPromise;

function loadGooglePlacesScript(apiKey) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Places is only available in the browser."));
  }

  if (!apiKey) {
    return Promise.reject(new Error("Missing Google Maps API key."));
  }

  if (window.google?.maps?.places) {
    return Promise.resolve(window.google);
  }

  if (googlePlacesScriptPromise) {
    return googlePlacesScriptPromise;
  }

  googlePlacesScriptPromise = new Promise((resolve, reject) => {
    let scriptElement = document.getElementById(GOOGLE_PLACES_SCRIPT_ID);

    const handleLoad = () => {
      if (window.google?.maps?.places) {
        if (scriptElement) {
          scriptElement.dataset.loaded = "true";
        }
        resolve(window.google);
      } else {
        reject(new Error("Google Places failed to load."));
      }
    };

    const handleError = () => {
      googlePlacesScriptPromise = undefined;
      reject(new Error("Unable to load Google Places script."));
    };

    if (scriptElement) {
      if (scriptElement.dataset.loaded === "true") {
        handleLoad();
        return;
      }

      scriptElement.addEventListener("load", handleLoad, { once: true });
      scriptElement.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    scriptElement = script;
    script.id = GOOGLE_PLACES_SCRIPT_ID;
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=places`;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.head.appendChild(script);
  });

  return googlePlacesScriptPromise;
}

function getAddressComponent(components, type) {
  return (
    components.find((component) => component.types?.includes(type))?.long_name || ""
  );
}

function getAddressLineFromComponents(components) {
  const orderedTypes = [
    "premise",
    "subpremise",
    "street_number",
    "route",
    "neighborhood",
    "sublocality_level_3",
    "sublocality_level_2",
    "sublocality_level_1",
  ];

  const uniqueParts = [];

  orderedTypes.forEach((type) => {
    const value = getAddressComponent(components, type);

    if (value && !uniqueParts.includes(value)) {
      uniqueParts.push(value);
    }
  });

  return uniqueParts.join(", ").trim();
}

function parsePlaceResult(place) {
  const components = place?.address_components || [];

  return {
    addressLine:
      getAddressLineFromComponents(components) ||
      place?.name ||
      String(place?.formatted_address || "").trim(),
    city:
      getAddressComponent(components, "locality") ||
      getAddressComponent(components, "postal_town") ||
      getAddressComponent(components, "administrative_area_level_3") ||
      getAddressComponent(components, "administrative_area_level_2"),
    state: getAddressComponent(components, "administrative_area_level_1"),
    country: getAddressComponent(components, "country"),
    pin: getAddressComponent(components, "postal_code"),
    formattedAddress: String(place?.formatted_address || "").trim(),
  };
}

export function StepBadge({
  number,
  title,
  description,
  active,
  completed = false,
}) {
  return (
    <div
      className={`rounded-none border px-4 py-4 transition ${
        active
          ? "border-amber-300 bg-amber-50 shadow-[0_8px_20px_rgba(245,158,11,0.08)]"
          : completed
            ? "border-emerald-200 bg-emerald-50"
            : "border-amber-100 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
            active
              ? "bg-amber-500 text-slate-950"
              : completed
                ? "bg-emerald-500 text-white"
                : "bg-amber-50 text-amber-700"
          }`}
        >
          {completed ? <CheckCircle2 size={18} /> : number}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-800">{title}</div>
          <div className="mt-1 text-sm text-slate-500">{description}</div>
        </div>
      </div>
    </div>
  );
}

export function SummaryTile({ label, value }) {
  return (
    <div className="rounded-none border-2 border-slate-100 bg-white px-4 py-3 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-base font-semibold text-slate-800">{value}</div>
    </div>
  );
}

export function FormSection({ title, description, children }) {
  return (
    <section className="rounded-none border-2 border-slate-100 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-5 border-b border-amber-100 pb-4">
        <h2 className="text-xl font-semibold text-amber-700">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  labelHidden = false,
  wrapperClassName = "",
  inputClassName = "",
  icon: Icon = null,
  iconClassName = "",
}) {
  return (
    <label className={`block ${wrapperClassName}`}>
      <span
        className={
          labelHidden
            ? "sr-only"
            : "mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800"
        }
      >
        {label}
        {required ? <span className="ml-1 text-[#C8102E]">*</span> : null}
      </span>
      <div className="relative">
        {Icon ? (
          <span
            className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 ${
              disabled ? "text-slate-300" : ""
            } ${iconClassName}`}
          >
            <Icon size={16} />
          </span>
        ) : null}
        <input
          type={type}
          value={value || ""}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`h-8 w-full rounded-none border border-slate-400 bg-white ${
            Icon ? "pl-10 pr-3" : "px-3"
          } py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${inputClassName}`}
        />
      </div>
    </label>
  );
}

export function AddressAutocompleteField({
  label,
  value,
  onChange,
  onAddressSelect,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  labelHidden = false,
  wrapperClassName = "",
  inputClassName = "",
  icon: Icon = null,
  iconClassName = "",
  countryRestriction = "in",
}) {
  const containerRef = useRef(null);
  const placesContainerRef = useRef(null);
  const autocompleteServiceRef = useRef(null);
  const placesServiceRef = useRef(null);
  const debounceTimeoutRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!GOOGLE_MAPS_API_KEY || disabled) {
      return undefined;
    }

    loadGooglePlacesScript(GOOGLE_MAPS_API_KEY)
      .then((google) => {
        if (!isMounted) {
          return;
        }

        autocompleteServiceRef.current =
          autocompleteServiceRef.current ||
          new google.maps.places.AutocompleteService();
        placesServiceRef.current =
          placesServiceRef.current ||
          new google.maps.places.PlacesService(placesContainerRef.current);
        setGoogleReady(true);
      })
      .catch(() => {
        if (isMounted) {
          setGoogleReady(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [disabled]);

  useEffect(() => {
    if (!googleReady || disabled) {
      setSuggestions([]);
      setIsOpen(false);
      return undefined;
    }

    const trimmedValue = String(value || "").trim();

    if (debounceTimeoutRef.current) {
      window.clearTimeout(debounceTimeoutRef.current);
    }

    if (trimmedValue.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return undefined;
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
      autocompleteServiceRef.current?.getPlacePredictions(
        {
          input: trimmedValue,
          types: ["geocode"],
          ...(countryRestriction
            ? { componentRestrictions: { country: countryRestriction } }
            : {}),
        },
        (predictions, status) => {
          const isSuccess =
            status === window.google?.maps?.places?.PlacesServiceStatus?.OK;

          if (!isSuccess || !predictions?.length) {
            setSuggestions([]);
            setIsOpen(false);
            return;
          }

          setSuggestions(predictions);
          setIsOpen(true);
        },
      );
    }, 250);

    return () => {
      if (debounceTimeoutRef.current) {
        window.clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [countryRestriction, disabled, googleReady, value]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelectSuggestion = (suggestion) => {
    if (!placesServiceRef.current) {
      onChange(suggestion.description);
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    placesServiceRef.current.getDetails(
      {
        placeId: suggestion.place_id,
        fields: ["address_components", "formatted_address", "name"],
      },
      (place, status) => {
        const isSuccess =
          status === window.google?.maps?.places?.PlacesServiceStatus?.OK;

        if (!isSuccess || !place) {
          onChange(suggestion.description);
          setSuggestions([]);
          setIsOpen(false);
          return;
        }

        const parsedPlace = parsePlaceResult(place);

        onChange(parsedPlace.addressLine || parsedPlace.formattedAddress);
        onAddressSelect?.(parsedPlace);
        setSuggestions([]);
        setIsOpen(false);
      },
    );
  };

  return (
    <label ref={containerRef} className={`relative block ${wrapperClassName}`}>
      <span
        className={
          labelHidden
            ? "sr-only"
            : "mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800"
        }
      >
        {label}
        {required ? <span className="ml-1 text-[#C8102E]">*</span> : null}
      </span>
      <div className="relative">
        {Icon ? (
          <span
            className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 ${
              disabled ? "text-slate-300" : ""
            } ${iconClassName}`}
          >
            <Icon size={16} />
          </span>
        ) : null}
        <input
          type={type}
          value={value || ""}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={() => {
            if (suggestions.length) {
              setIsOpen(true);
            }
          }}
          onChange={(event) => onChange(event.target.value)}
          className={`h-8 w-full rounded-none border border-slate-400 bg-white ${
            Icon ? "pl-10 pr-3" : "px-3"
          } text-[12px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${inputClassName}`}
        />
        {googleReady && isOpen && suggestions.length ? (
          <div className="absolute left-0 right-0 top-[calc(100%+2px)] z-30 overflow-hidden rounded-none border-2 border-slate-200 bg-white shadow-xl">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.place_id}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="flex w-full items-start gap-3 border-b border-slate-100 px-3 py-2.5 text-left transition hover:bg-amber-50 last:border-b-0"
              >
                <span className="mt-0.5 text-slate-400">
                  {Icon ? <Icon size={16} /> : null}
                </span>
                <span className="min-w-0 text-sm text-slate-700">
                  <span className="block truncate font-medium">
                    {suggestion.structured_formatting?.main_text ||
                      suggestion.description}
                  </span>
                  {suggestion.structured_formatting?.secondary_text ? (
                    <span className="block truncate text-xs text-slate-500">
                      {suggestion.structured_formatting.secondary_text}
                    </span>
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div ref={placesContainerRef} className="hidden" />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  labelHidden = false,
  wrapperClassName = "",
  selectClassName = "",
  icon: Icon = null,
  iconClassName = "",
}) {
  return (
    <label className={`block ${wrapperClassName}`}>
      <span
        className={
          labelHidden
            ? "sr-only"
            : "mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800"
        }
      >
        {label}
        {required ? <span className="ml-1 text-[#C8102E]">*</span> : null}
      </span>
      <div className="relative">
        {Icon ? (
          <span
            className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 ${
              disabled ? "text-slate-300" : ""
            } ${iconClassName}`}
          >
            <Icon size={16} />
          </span>
        ) : null}
        <select
          value={value || ""}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={`h-8 w-full appearance-none rounded-none border border-slate-400 bg-white ${
            Icon ? "pl-10 pr-9" : "px-3 pr-9"
          } py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${selectClassName}`}
        >
          {options.map((option) => (
            <option key={option.value || option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <ChevronDown size={14} />
        </span>
      </div>
    </label>
  );
}

export function VerificationCard({
  icon: Icon,
  title,
  description,
  verified,
  children,
}) {
  return (
    <div className="rounded-none border-2 border-slate-100 bg-slate-50/50 p-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-11 w-11 items-center justify-center rounded-full ${
              verified ? "bg-emerald-100 text-emerald-600" : "bg-white text-amber-600"
            }`}
          >
            {verified ? <CheckCircle2 size={18} /> : <Icon size={18} />}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">{title}</div>
            <div className="mt-1 text-sm text-slate-500">{description}</div>
          </div>
        </div>
        {verified ? (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Verified
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function VerificationActionRow({
  value,
  onChange,
  sendText,
  onSend,
  onVerify,
  sendDisabled,
  verifyDisabled,
  sending,
  verifying,
  verified,
}) {
  return (
    <div className="grid gap-3 md:grid-cols-[auto,1fr,auto]">
      <button
        type="button"
        onClick={onSend}
        disabled={sendDisabled || verified}
        className="inline-flex h-10 items-center justify-center rounded-none border-2 border-slate-200 bg-white px-4 text-xs font-bold uppercase tracking-widest text-slate-700 transition hover:border-[#C8102E] hover:text-[#C8102E] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending..." : sendText}
      </button>

      <InputField
        label="Enter OTP"
        value={value}
        onChange={onChange}
        placeholder="4-6 digit OTP"
        disabled={verified}
        labelHidden
      />

      <button
        type="button"
        onClick={onVerify}
        disabled={verifyDisabled || verified}
        className="inline-flex h-10 items-center justify-center rounded-none bg-slate-900 px-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {verifying ? "Verifying..." : verified ? "Verified" : "Verify"}
      </button>
    </div>
  );
}

export function FileInputField({
  label,
  value,
  onChange,
  accept = "image/*,.pdf",
  placeholder = "No file chosen",
  wrapperClassName = "",
  hideLabelBox = false,
  labelIcon: LabelIcon = null,
}) {
  return (
    <label
      className={`grid cursor-pointer gap-3 ${
        hideLabelBox ? "grid-cols-1" : "md:grid-cols-[180px,1fr]"
      } md:items-center ${wrapperClassName}`}
    >
      {hideLabelBox ? null : (
        <div className="flex items-center gap-2 rounded-none border-2 border-slate-100 bg-white px-4 py-[9px] text-xs font-bold uppercase tracking-wider text-slate-700">
          {LabelIcon ? <LabelIcon size={14} className="text-[#C8102E]" /> : null}
          {label}
        </div>
      )}

      <div className="flex min-h-[40px] items-center gap-3 rounded-none border-2 border-slate-100 bg-white px-3 py-1 transition hover:border-[#C8102E]">
        <span className="inline-flex h-7 items-center rounded-none border-2 border-slate-100 bg-slate-50 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-700">
          <Upload size={14} className="mr-2" />
          Choose File
        </span>
        <span className="truncate text-sm text-slate-500">
          {value?.name || placeholder}
        </span>
      </div>

      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => onChange(event.target.files?.[0])}
      />
    </label>
  );
}

export function SelectFileRow({
  label,
  selectValue,
  onSelect,
  options,
  fileValue,
  onFileChange,
  selectIcon: SelectIcon = null,
}) {
  return (
    <div className="grid gap-3 md:grid-cols-[180px,1fr] md:items-center">
      <SelectField
        label={label}
        value={selectValue}
        onChange={onSelect}
        options={options}
        labelHidden
        icon={SelectIcon}
      />
      <FileInputField
        value={fileValue}
        onChange={onFileChange}
        label="Choose File"
        hideLabelBox
      />
    </div>
  );
}

export function CountrySelectField({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  labelHidden = false,
  wrapperClassName = "",
  icon: Icon = null,
  iconClassName = "",
  placeholder = "Select Country",
}) {
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .map((c) => c.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(sorted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const filtered = search
    ? countries.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
    : countries;

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen((o) => !o);
      setSearch("");
    }
  };

  return (
    <label ref={containerRef} className={`relative block ${wrapperClassName}`}>
      <span
        className={
          labelHidden
            ? "sr-only"
            : "mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800"
        }
      >
        {label}
        {required ? <span className="ml-1 text-[#C8102E]">*</span> : null}
      </span>
      <div className="relative">
        {Icon ? (
          <span
            className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 ${
              disabled ? "text-slate-300" : ""
            } ${iconClassName}`}
          >
            <Icon size={16} />
          </span>
        ) : null}
        <button
          type="button"
          disabled={disabled}
          onClick={handleOpen}
          className={`h-8 w-full appearance-none rounded-none border border-slate-400 bg-white ${
            Icon ? "pl-10 pr-9" : "px-3 pr-9"
          } py-0 leading-tight text-[12px] font-medium text-left outline-none transition focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 ${
            value ? "text-slate-900" : "text-slate-400"
          }`}
        >
          {value || (loading ? "Loading countries..." : placeholder)}
        </button>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <ChevronDown size={14} />
        </span>
        {isOpen ? (
          <div className="absolute left-0 right-0 top-[calc(100%+2px)] z-30 overflow-hidden rounded-none border-2 border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-100 p-1.5">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-7 w-full rounded-none border border-slate-300 bg-white px-2 text-[12px] font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#C8102E]"
              />
            </div>
            <div className="max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-3 py-2 text-sm text-slate-400">No countries found</div>
              ) : (
                filtered.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onChange(country);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`flex w-full items-center border-b border-slate-100 px-3 py-1.5 text-left text-[12px] transition hover:bg-amber-50 last:border-b-0 ${
                      value === country
                        ? "bg-amber-50 font-semibold text-amber-700"
                        : "text-slate-700"
                    }`}
                  >
                    {country}
                  </button>
                ))
              )}
            </div>
          </div>
        ) : null}
      </div>
    </label>
  );
}

export const VerificationIcons = {
  Smartphone,
  Mail,
  ShieldCheck,
};
