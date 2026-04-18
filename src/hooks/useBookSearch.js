import { useEffect, useRef, useState } from "react";
import { useSubmit } from "react-router-dom";

export default function useBookSearch(initialKeyword, action = "/") {
  const submit = useSubmit();
  const [inputValue, setInputValue] = useState(initialKeyword);
  const hasSearchRef = useRef(initialKeyword.trim() !== "");
  const isComposingRef = useRef(false);

  useEffect(() => {
    setInputValue(initialKeyword);
    hasSearchRef.current = initialKeyword.trim() !== "";
  }, [initialKeyword]);

  function submitSearch(form, nextValue) {
    const formData = new FormData(form);
    const normalizedValue = nextValue.trim();

    if (!normalizedValue) {
      formData.delete("q");
    }

    submit(formData, {
      action,
      method: "get",
      replace: hasSearchRef.current,
    });

    hasSearchRef.current = normalizedValue !== "";
  }

  function handleInputChange(event) {
    const nextValue = event.target.value;

    setInputValue(nextValue);

    if (isComposingRef.current) {
      return;
    }

    submitSearch(event.currentTarget.form, nextValue);
  }

  function handleCompositionStart() {
    isComposingRef.current = true;
  }

  function handleCompositionEnd(event) {
    const nextValue = event.currentTarget.value;

    isComposingRef.current = false;
    setInputValue(nextValue);
    submitSearch(event.currentTarget.form, nextValue);
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitSearch(event.currentTarget, inputValue);
  }

  return {
    inputValue,
    handleInputChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleSubmit,
  };
}
