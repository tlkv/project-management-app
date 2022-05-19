/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-props-no-spreading */
import './CreateBoardBar.scss';
import React, { Dispatch, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { SET_BOARDS } from '../../data/constantsV';
import getBoards from '../../api/getBoards';
import createBoard from '../../api/createBoard';
import { NewBoard } from '../../data/interfacesV';

function CreateBoardBar({
  setIsCreateBoardOpen,
}: {
  setIsCreateBoardOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { dispatchBoards } = useContext(AppContext);
  const [boardIsCreating, setBoardIsCreating] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<NewBoard>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const Container = document.getElementById('modal') as HTMLElement;

  const loadBoards = async () => {
    const data = await getBoards();
    if (data) {
      dispatchBoards({ type: SET_BOARDS, payload: data });
    }
  };

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCreateBoardOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const onSubmit: SubmitHandler<NewBoard> = async (data) => {
    setBoardIsCreating(true);
    const res = await createBoard(data.title, data.description);
    if (res) {
      await loadBoards();
      navigate(`/board/${res.id}`);
    }

    setBoardIsCreating(false);
    setIsCreateBoardOpen(false);
  };

  return ReactDOM.createPortal(
    <div
      className="modal-wrapper"
      role="button"
      onClick={() => setIsCreateBoardOpen(false)}
      tabIndex={0}
    >
      <div className="create-board" role="presentation" onClick={(e) => e.stopPropagation()}>
        <h3>Create board</h3>
        <button
          className="create-board__close-btn"
          type="button"
          aria-label="toggle"
          onClick={() => setIsCreateBoardOpen(false)}
        ></button>
        <form className="create-board__form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="create-board__field">
            <label htmlFor="title">
              {errors.title ? (
                <span className="create-board__invalid">{errors.title.message}</span>
              ) : (
                <span>Board title:</span>
              )}

              <input
                className="create-board__input"
                type="text"
                placeholder="Homework"
                disabled={boardIsCreating}
                {...register('title', {
                  required: 'Enter a board name',
                  pattern: {
                    value: /[a-zA-Z0-9]{2,20}/,
                    message: 'should be at least 2 and max 20 symbols',
                  },
                  onChange: () => clearErrors('title'),
                })}
              />
            </label>
          </div>
          <div className="create-board__field">
            <label htmlFor="description">
              {errors.description ? (
                <span className="create-board__invalid">{errors.description.message}</span>
              ) : (
                <span>Board description:</span>
              )}

              <input
                className="create-board__input"
                type="text"
                placeholder="Needs to buy for home"
                disabled={boardIsCreating}
                {...register('description', {
                  required: 'Enter a board description',
                  pattern: {
                    value: /[a-zA-Z0-9]{4,30}/,
                    message: 'should be at least 4 and max 30 symbols',
                  },
                  onChange: () => clearErrors('description'),
                })}
              />
            </label>
          </div>
          <button
            className="create-board__create-btn"
            type="submit"
            disabled={!isDirty || !!Object.keys(errors).length}
          >
            Create
          </button>
        </form>
      </div>
    </div>,
    Container
  );
}

export default CreateBoardBar;
