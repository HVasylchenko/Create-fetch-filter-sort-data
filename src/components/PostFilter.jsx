import React from "react";
import MySelect from "../components/UI/select/MySelect";

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <h1>Seach by title</h1>
      <input
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Sorting :"
        options={[
          { value: "title", name: "by title" },
          { value: "body", name: "by body" },
        ]}
      />
    </div>
  );
};

export default PostFilter;
