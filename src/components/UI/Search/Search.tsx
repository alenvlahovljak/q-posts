import { useState, FC, FormEvent } from 'react';
import { withLogger } from '@/hoc';

import css from './Search.module.css';

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search: FC<SearchProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(value);
  };

  return (
    <form className={css.container} onSubmit={handleFormSubmit}>
      <input
        data-testid="input"
        type="search"
        placeholder="Search by username..."
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </form>
  );
};

export default withLogger(Search);
