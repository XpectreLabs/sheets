import React, { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import SVGIcon from "../SVGIcon";

type Props = {
  tooltip: string;
  iconId?: string;
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => React.ReactNode;
};

const Combo: React.FC<Props> = ({
  tooltip,
  onClick,
  text,
  iconId,
  children,
}) => {
  const style: CSSProperties = { userSelect: "none" };
  const [open, setOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ left: 0 });
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popupRef, () => {
    setOpen(false);
  });

  useLayoutEffect(() => {
    // re-position the popup menu if it overflows the window
    if (!popupRef.current) {
      return;
    }
    if (!open) {
      setPopupPosition({ left: 0 });
    }
    const winW = window.innerWidth;
    const rect = popupRef.current.getBoundingClientRect();
    const menuW = rect.width;
    const { left } = rect;
    if (left + menuW > winW) {
      setPopupPosition({ left: -rect.width + buttonRef.current!.clientWidth });
    }
  }, [open]);

  return (
    <div className="fortune-toobar-combo-container fortune-toolbar-item">
      <div ref={buttonRef} className="fortune-toolbar-combo">
        <div
          className="fortune-toolbar-combo-button"
          onClick={(e) => {
            if (onClick) onClick(e);
            else setOpen(!open);
          }}
          data-tips={tooltip}
          role="button"
          style={style}
        >
          {iconId ? (
            <SVGIcon name={iconId} />
          ) : (
            <span className="fortune-toolbar-combo-text">{text}</span>
          )}
        </div>
        <div
          className="fortune-toolbar-combo-arrow"
          onClick={() => setOpen(!open)}
          data-tips={tooltip}
          role="button"
          style={style}
        >
          <SVGIcon name="combo-arrow" width={10} />
        </div>
        {tooltip && <div className="fortune-tooltip">{tooltip}</div>}
      </div>
      {open && (
        <div
          ref={popupRef}
          className="fortune-toolbar-combo-popup"
          style={popupPosition}
        >
          {children?.(setOpen)}
        </div>
      )}
    </div>
  );
};

export default Combo;
