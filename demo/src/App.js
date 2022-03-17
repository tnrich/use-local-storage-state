import React, { useState } from 'react'
// import useLocalStorageState from 'use-local-storage-state' //tnr comment this line in and the following line out to see the difference between the two libraries
import useLocalStorageState from '../../es/src/useLocalStorageState'

localStorage.removeItem('color')
localStorage.removeItem('name')
localStorage.setItem('name', 'nameAlreadySetInLocalStorage')
localStorage.removeItem('age')

export default function MyComponent() {
    const [color, setColor] = useLocalStorageState('color', {
        defaultValue: `defaultColor`,
        isSimpleString: true,
    })
    const [name, setName] = useLocalStorageState('name', {
        defaultValue: 'defaultName',
        isSimpleString: true,
    })
    const [jsonifiedString, setJsonifiedString] = useLocalStorageState('jsonifiedString', {
        defaultValue: JSON.stringify('default jsonified string val'),
        //note no isSimpleString here
    })
    const [age, setAge] = useLocalStorageState('age')
    const [notes, setNotes] = useLocalStorageState('notes', {
        defaultValue: ['default', 'notes'],
    })

    return (
        <div>
            <button
                onClick={() => {
                    localStorage.setItem('color', `colorFromLocalStorage`)
                    localStorage.setItem('age', 1)
                    localStorage.setItem(
                        'jsonifiedString',
                        JSON.stringify(`jsonifiedStringFromLocalStorage`),
                    )
                    localStorage.setItem('name', `nameFromLocalStorage`)
                    localStorage.setItem(
                        'notes',
                        `['noteFromLocalStorage','anotherNoteFromLocalStorage' ]`,
                    )
                }}
            >
                click me to manually update localStorage
            </button>
            <button
                onClick={() => {
                    setColor('colorFromHook')
                    setAge(11)
                    setJsonifiedString(JSON.stringify('jsonifiedStringFromHook'))
                    setName('nameFromHook')
                    setNotes(['noteFromHook', 'anotherNoteFromHook'])
                }}
            >
                click me to update via use-local-storage-state hook
            </button>
            <br></br>
            <br></br>
            <h3>color from use-local: {color}</h3>
            <div>localStorage.getItem("color"): {localStorage.getItem('color')}</div>
            <br></br>
            <br></br>
            this was the old and IMO kind of dumb way to handle strings where you'd either need to
            JSON.stringify or wrap the strings in ticks like so `"someString"` :
            <h3>jsonifiedString from use-local: {jsonifiedString}</h3>
            <div>
                localStorage.getItem("jsonifiedString"): {localStorage.getItem('jsonifiedString')}
            </div>
            <h3>name from use-local: {name}</h3>
            <div>localStorage.getItem("name"): {localStorage.getItem('name')}</div>
            <h3>
                age from use-local:{' '}
                {age ||
                    'tnrTodo - there should be an age here.. this was already broken though before I got here'}
            </h3>
            <div>localStorage.getItem("age"): {localStorage.getItem('age')}</div>
            <h3>notes from use-local: {notes && notes.join(',')}</h3>
            <div>localStorage.getItem("notes"): {localStorage.getItem('notes')}</div>
            <br></br>
            <br></br>
            <br></br>
            <AnothaComponent />
        </div>
    )
}

function AnothaComponent() {
    const [color, setColor] = useLocalStorageState('color', {
        defaultValue: `defaultNestedColor`,
        isSimpleString: true,
    })
    const [name, setName] = useLocalStorageState('name', {
        defaultValue: 'defaultNestedName',
        isSimpleString: true,
    })
    const [age, setAge] = useLocalStorageState('age', {
        defaultValue: 40,
    })
    const [notes, setNotes] = useLocalStorageState('notes', {
        defaultValue: ['default', 'nestedNotes'],
    })

    return (
        <div>
            <h3>Nested Component</h3>
            <button
                onClick={() => {
                    localStorage.setItem('color', `colorFromLocalStorage2`)
                    localStorage.setItem('name', `nameFromLocalStorage2`)
                    localStorage.setItem('age', 2)
                    localStorage.setItem(
                        'notes',
                        `['noteFromLocalStorage2','anotherNoteFromLocalStorage2' ]`,
                    )
                }}
            >
                click me to manually update nested localStorage
            </button>
            <button
                onClick={() => {
                    setColor('colorFromHook2')
                    setName('nameFromHook2')
                    setAge(22)
                    setNotes(['noteFromNestedHook', 'anotherNoteFromNestedHook'])
                }}
            >
                click me to update via nested use-local-storage-state hook
            </button>
            <br></br>
            <br></br>
            <h3>color from use-local nested: {color}</h3>
            <div>nested localStorage.getItem("color"): {localStorage.getItem('color')}</div>
            <h3>name from use-local nested: {name}</h3>
            <div>nested localStorage.getItem("name"): {localStorage.getItem('name')}</div>
            <h3>age from use-local nested: {age}</h3>
            <div>nested localStorage.getItem("age"): {localStorage.getItem('age')}</div>
            <h3>notes from use-local nested: {notes && notes.join(',')}</h3>
            <div>nested localStorage.getItem("notes"): {localStorage.getItem('notes')}</div>
        </div>
    )
}
