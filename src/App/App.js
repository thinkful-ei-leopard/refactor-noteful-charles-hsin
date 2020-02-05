import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import NotefulContext from '../NotefulContext';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';

class App extends Component {
    
    state = {
        notes: dummyStore.notes,
        folders: dummyStore.folders,
       
    };

   handleDelete=(event, noteId)=>{
     event.preventDefault();
    
     console.log(this.props.location)
     this.setState({notes: this.state.notes.filter(note => note.id !== noteId )})
  }

   handleDeleteRedirect= (event, noteId)=>{
     this.handleDelete(event, noteId)
     this.props.history.push('/')
   }
  

    componentDidMount() {
        // fake date loading from API call
        setTimeout(() => this.setState(dummyStore), 600);
    }

    renderNavRoutes() {
        const contextValue ={notes: this.state.notes,
                             folders:this.state.folders};
        const {notes, folders} = contextValue;
        this.context = contextValue
        return (
            
           
            <NotefulContext.Provider value={contextValue}>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                   
                )
                )}
                
                <Route
                    path="/note/:noteId"
                    
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        

                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
                </NotefulContext.Provider>
           
            
        );
    }

    renderMainRoutes() {
        console.log(this.context)
        const {notes} = this.context;
        
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                           
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                    handleDelete={this.handleDelete}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} 
                        note={note} 
                        handleDelete={this.handleDeleteRedirect}
                        />;
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <div className="App">
            <nav className="App__nav">{this.renderNavRoutes()}</nav>    
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
        );
    }
}

export default withRouter(App);

// <nav className="App__nav">{this.renderNavRoutes()}</nav>