import React, { useEffect, useLayoutEffect, useState } from 'react'

const FeatureSelection = ({handleFeatures, initalData}: any) => {
    const [tag, setTag] = useState<string|undefined>("")
    const[selectedTags, setSelectedTags] = useState<string[]>([])
    const tagDropdown = true
    useLayoutEffect(() => {
      if(initalData) {
        setSelectedTags(initalData.split(','))
      }
    }, [initalData])
    const addTag = (tag: string) => {
        if(tag) {
          setSelectedTags(items => !items.includes(tag) ? [...items, tag] : [...items])
          setTag("")
        }
    }
    const removeTag = (tag: string) => {
        if(tag){
            const filteredTags = selectedTags.filter((item) => item !== tag)
            setSelectedTags(filteredTags)
        }
    }
    useEffect(() => {
      if(selectedTags.length > 0)
        handleFeatures(selectedTags.join(','))
    }, [selectedTags])
    return (
        <div
      className={'tags_container'}
    >
      <div
        className={`dropdown_display ${
          tagDropdown ? 'dropDown_open' : null
        }`}
      >
        <div className={'addTag'}>
          <input
            type="text"
            value={tag}
            placeholder="Add Features"
            className={'addTag_input'}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter' && tag) {
                  addTag(tag)
                }
            }}
          />
            <img
                className="mr-1 add-tags"
                src="/static/images/plus.png"
                alt=""
                onClick={() => tag && addTag(tag)}
            />
        </div>
      </div>
      <div className='chosenTagsContainer'>
      {selectedTags &&
          selectedTags.map((t) => {
            return (
              <div
                key={t}
                className={'chosenTags'}
              >
                <span className={'chosenTags__tag'}>{t}</span>
                <span className={'chosenTags__remove'} onClick={() => removeTag(t)}>X</span>
              </div>
            );
          })}
      </div>
    </div>
    )
}

export default FeatureSelection