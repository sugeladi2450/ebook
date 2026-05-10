// 书籍搜索功能的自定义 Hook，专门封装搜索框的所有逻辑，包括输入监听、中文输入法处理、表单提交、路由查询、实时搜索。
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

  // 用户每敲一个字，就更新框里的文字。如果不是在打中文，就立刻搜索。
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
    //阻止浏览器默认的刷新行为
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
