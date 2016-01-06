;; .dir-locals.el
((nil
  .
  ((firestarter . (async-shell-command (concat "PORT=1337 mocha "
                                               (expand-file-name
                                                "test"

                                                (projectile-project-root)))
                                       "* Mocha Test Output *"
                                       "* Mocha Test Error Output *"
                                       )))))
