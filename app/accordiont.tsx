import React, { useState } from 'react';

const Accordion = () => {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <div id="accordion-open" data-accordion="open">
      {/* 面板 1 */}
      <h2 id="accordion-open-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-open-body-1"
          aria-expanded={isOpen1}
          aria-controls="accordion-open-body-1"
          onClick={() => setIsOpen1(!isOpen1)}
        >
          {/* 按钮内部内容保持不变 */}
        </button>
      </h2>
      <div id="accordion-open-body-1" className={!isOpen1 ? 'hidden' : ''}>
        {/* 面板 1 的内容 */}
      </div>

      {/* 面板 2 */}
      <h2 id="accordion-open-heading-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-open-body-2"
          aria-expanded={isOpen2}
          aria-controls="accordion-open-body-2"
          onClick={() => setIsOpen2(!isOpen2)}
        >
          {/* 按钮内部内容保持不变 */}
        </button>
      </h2>
      <div id="accordion-open-body-2" className={!isOpen2 ? 'hidden' : ''}>
        {/* 面板 2 的内容 */}
      </div>

      {/* 面板 3 */}
      <h2 id="accordion-open-heading-3">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-open-body-3"
          aria-expanded={isOpen3}
          aria-controls="accordion-open-body-3"
          onClick={() => setIsOpen3(!isOpen3)}
        >
          {/* 按钮内部内容保持不变 */}
        </button>
      </h2>
      <div id="accordion-open-body-3" className={!isOpen3 ? 'hidden' : ''}>
        {/* 面板 3 的内容 */}
      </div>
    </div>
  );
};

export default Accordion;
